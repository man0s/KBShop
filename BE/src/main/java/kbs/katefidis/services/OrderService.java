package kbs.katefidis.services;

import kbs.katefidis.entities.Order;
import kbs.katefidis.entities.OrderProduct;
import kbs.katefidis.entities.Product;
import kbs.katefidis.repositories.OrderProductRepository;
import kbs.katefidis.repositories.OrderRepository;
import kbs.katefidis.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderProductRepository orderProductRepository;

    public OrderService(OrderRepository orderRepository, ProductRepository productRepository, OrderProductRepository orderProductRepository) {
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
    public ResponseEntity<String> createOrder(Order order) {
        try {
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
                } else return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body("This order cannot be created[Empty inventory]!(" + HttpStatus.BAD_REQUEST + ")");
            }

            newOrder.setPrice_total(order.getPrice_total());
            newOrder.setProducts_total(order.getProducts_total());
            newOrder.setName(order.getName());
            newOrder.setSurname(order.getSurname());
            newOrder.setAddress(order.getAddress());
            newOrder.setPhone(order.getPhone());
            newOrder.setPosted(order.getPosted());

            newOrder.setOrderProducts(orderProductRepository.saveAll(orderProducts));

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Order has been created!(" + HttpStatus.CREATED + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This order cannot be created!", e);
        }
    }

    @Transactional
    public ResponseEntity<String> deleteOrder(Long orderID) {
        try {
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
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Order has been deleted!(" + HttpStatus.OK + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This order cannot be removed!", e);
        }
    }

    @Transactional
    public ResponseEntity<String> editOrder(Order order) {
        try {
            Order newOrder = orderRepository.getOne(order.getId());
            newOrder.setName(order.getName());
            newOrder.setSurname(order.getSurname());
            newOrder.setAddress(order.getAddress());
            newOrder.setPhone(order.getPhone());
            newOrder.setPosted(order.getPosted());
            orderRepository.save(newOrder);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body("Order has been edited!(" + HttpStatus.OK + ")");
        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "This order cannot be edited!", e);
        }
    }


}
