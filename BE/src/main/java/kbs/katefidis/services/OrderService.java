package kbs.katefidis.services;

import kbs.katefidis.entities.Order;
import kbs.katefidis.repositories.OrderRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }


    @Transactional
    public List<Order> findAll() {
        return orderRepository.findAll();
    }

}
