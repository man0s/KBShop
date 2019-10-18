package kbs.katefidis.controllers;

import kbs.katefidis.entities.Order;
import kbs.katefidis.entities.Product;
import kbs.katefidis.services.OrderService;
import org.springframework.boot.context.properties.source.ConfigurationPropertyName;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping(path = "/getOrders", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Order> getAllOrdersRequest() {
        return orderService.findAll();
    }

    @GetMapping(path = "/getOrders/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Order> getOrdersRequest(@PathVariable("email") String userEmail) {
        return orderService.getOrders(userEmail);
    }

//    @PostMapping(path = "/createOrder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
//    public Order createOrderRequest(@RequestBody ConfigurationPropertyName.Form form){
//        return orderService.createOrder(order);
//    }

    @PutMapping(path = "/editOrder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Order editOrderRequest(@RequestBody Order order) {
        return orderService.editOrder(order);
    }

//    @PostMapping(path = "/createOrder")
//    public Order createOrderRequest(){
//        return orderService.createOrder();
//    }

    @PostMapping(path = "/createOrder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Order createUserRequest(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

}
