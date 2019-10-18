package kbs.katefidis.services;

import kbs.katefidis.entities.Order;
import kbs.katefidis.entities.OrderProduct;
import kbs.katefidis.entities.Product;
import kbs.katefidis.entities.User;
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
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderProductRepository orderProductRepository;

    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository, OrderProductRepository orderProductRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
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

//    @Transactional
//    public Order createOrder(Order order) {
//
//        return orderRepository.save(order);
//    }

    @Transactional
    public Order createOrder() {
        Order order = new Order();
        //user
        User user = new User();
        user.setEmail("manoskatef@gmail.com");
        user.setName("Emmanouil");
        user.setSurname("Katefidis");
        user = userRepository.save(user);

        order.setUser(user);
        //product
        Product product = new Product();
        product.setImage("https://i.imgur.com/fKEuHYq.jpg");
        product.setPrice((double) 1429);
        product.setQuantity(10);
        product.setTitle("Apple iPhone 11 Pro 256GB");
        product = productRepository.save(product);

        Product product2 = new Product();
        product2.setImage("https://i.imgur.com/eP63NSu.jpg");
        product2.setPrice((double) 1499);
        product2.setQuantity(6);
        product2.setTitle("dji Mavic 2 Pro");
        product2 = productRepository.save(product2);

        //orderproduct1
        OrderProduct orderProduct1 = new OrderProduct();
        orderProduct1.setOrder(order);
        orderProduct1.setProduct(product);
        orderProduct1.setQuantity(2);
        orderProduct1 = orderProductRepository.save(orderProduct1);
        //orderproduct2
        OrderProduct orderProduct2 = new OrderProduct();
        orderProduct2.setOrder(order);
        orderProduct2.setProduct(product2);
        orderProduct2.setQuantity(1);
        orderProduct2 = orderProductRepository.save(orderProduct2);
        //list orderproduct
        List<OrderProduct> orderProducts = new ArrayList<OrderProduct>();
        orderProducts.add(orderProduct1);
        orderProducts.add(orderProduct2);

        order.setOrderProducts(orderProducts);
        order.setPrice_total( (product.getPrice() * orderProduct1.getQuantity() ) + (product2.getPrice() * orderProduct2.getQuantity()));
        order.setProducts_total(orderProducts.size());
        order.setName("Emmanouil");
        order.setSurname("Katefidis");
        order.setAddress("Mpoukaouri 86");
        order.setPosted(false);

        order = orderRepository.save(order);

        return order;
    }

    @Transactional
    public Order editOrder(Order order) {
        Order newOrder = orderRepository.getOne(order.getId());
        newOrder.setName(order.getName());
        newOrder.setSurname(order.getSurname());
        newOrder.setAddress(order.getAddress());
        newOrder.setPosted(order.getPosted());
        return orderRepository.save(newOrder);
    }


}
