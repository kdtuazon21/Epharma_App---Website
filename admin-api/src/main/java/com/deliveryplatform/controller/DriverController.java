package com.deliveryplatform.controller;

import com.deliveryplatform.model.Driver;
import com.deliveryplatform.repository.DriverRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {
    private final DriverRepository driverRepository;

    public DriverController(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @GetMapping
    public List<Driver> list() { return driverRepository.findAll(); }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Driver d) {
        Driver saved = driverRepository.save(d);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Driver d) {
        return driverRepository.findById(id).map(existing -> {
            if (d.getName() != null) existing.setName(d.getName());
            if (d.getEmail() != null) existing.setEmail(d.getEmail());
            if (d.getDeliveries() != null) existing.setDeliveries(d.getDeliveries());
            if (d.getRating() != null) existing.setRating(d.getRating());
            driverRepository.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        driverRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
