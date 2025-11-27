package com.deliveryplatform.controller;

import com.deliveryplatform.model.OrderEntity;
import com.deliveryplatform.repository.OrderRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public List<OrderEntity> list() { return orderRepository.findAll(); }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody OrderEntity o) {
        OrderEntity saved = orderRepository.save(o);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody OrderEntity o) {
        return orderRepository.findById(id).map(existing -> {
            if (o.getStatus() != null) existing.setStatus(o.getStatus());
            if (o.getTotal() != null) existing.setTotal(o.getTotal());
            orderRepository.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        orderRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
