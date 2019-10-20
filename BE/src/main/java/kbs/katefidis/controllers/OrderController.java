package kbs.katefidis.controllers;

import kbs.katefidis.entities.Order;
import kbs.katefidis.services.OrderService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(path = "/createOrder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> createUserRequest(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @DeleteMapping(path = "/deleteOrder/{id}")
    public ResponseEntity<String> deleteUserRequest(@PathVariable("id") Long orderID) {
        return orderService.deleteOrder(orderID);
    }

    @PutMapping(path = "/editOrder", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> editOrderRequest(@RequestBody Order order) {
        return orderService.editOrder(order);
    }


}
