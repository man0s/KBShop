package kbs.katefidis.controllers;

import kbs.katefidis.entities.Order;
import kbs.katefidis.entities.Product;
import kbs.katefidis.services.OrderService;
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
    public List<Order> getOrdersRequest() {
        return orderService.findAll();
    }

    @PostMapping(path = "/createOrder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Order createOrderRequest(@RequestBody Order order){
        return orderService.createOrder(order);
    }
}
