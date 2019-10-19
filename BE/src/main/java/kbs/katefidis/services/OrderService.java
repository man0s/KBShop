package kbs.katefidis.services;

import kbs.katefidis.entities.Order;
import kbs.katefidis.entities.OrderProduct;
import kbs.katefidis.entities.Product;
import kbs.katefidis.repositories.OrderProductRepository;
import kbs.katefidis.repositories.OrderRepository;
import kbs.katefidis.repositories.ProductRepository;
import kbs.katefidis.repositories.UserRepository;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderProductRepository orderProductRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository, OrderProductRepository orderProductRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderProductRepository = orderProductRepository;
    }


    @Transactional
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Transactional
    public List<Order> getOrders(String userEmail) {
        return orderRepository.getOrdersByUserEmail(userEmail);
    }

    @Transactional
    public Order createOrder(Order order) {
        Order newOrder = new Order();
        List<OrderProduct> orderProducts = new ArrayList<OrderProduct>();

        newOrder.setUser(order.getUser());

        orderProducts = order.getOrderProducts();
        //go through all products of the order
        for(int i=0 ; i < orderProducts.size();i++) {
            OrderProduct orderProduct = orderProducts.get(i);
            Product product = orderProduct.getProduct();
            //check if the product is on the inventory
            if( orderProduct.getQuantity() <= product.getQuantity())
            {
                Product newProduct = productRepository.getOne(product.getId());
                //remove product quantity from inventory
                newProduct.setQuantity(product.getQuantity() - orderProduct.getQuantity());
                productRepository.save(newProduct);
            } else return null;
        }

        newOrder.setPrice_total(order.getPrice_total());
        newOrder.setProducts_total(order.getProducts_total());
        newOrder.setName(order.getName());
        newOrder.setSurname(order.getSurname());
        newOrder.setAddress(order.getAddress());
        newOrder.setPhone(order.getPhone());
        newOrder.setPosted(order.getPosted());

        newOrder.setOrderProducts(orderProductRepository.saveAll(orderProducts));

        return newOrder;
    }

    @Transactional
    public Order editOrder(Order order) {
        Order newOrder = orderRepository.getOne(order.getId());
        newOrder.setName(order.getName());
        newOrder.setSurname(order.getSurname());
        newOrder.setAddress(order.getAddress());
        newOrder.setPhone(order.getPhone());
        newOrder.setPosted(order.getPosted());
        return orderRepository.save(newOrder);
    }

    @Transactional
    public void deleteOrder(Long orderID) {

        Order order = orderRepository.getOne(orderID);

        List<OrderProduct> orderProducts = new ArrayList<OrderProduct>();
        orderProducts = order.getOrderProducts();

        //go through all products of the order
        for(int i=0 ; i < orderProducts.size();i++) {
            OrderProduct orderProduct = orderProducts.get(i);
            Product product = orderProduct.getProduct();
            Product oldProduct = productRepository.getOne(product.getId());
            //restore the old product inventory
            oldProduct.setQuantity(product.getQuantity() + orderProduct.getQuantity());
            productRepository.save(oldProduct);
        }

        orderRepository.deleteById(orderID);
    }


}
