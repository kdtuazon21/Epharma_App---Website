package com.deliveryplatform.controller;

import com.deliveryplatform.model.Merchant;
import com.deliveryplatform.repository.MerchantRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/merchants")
public class MerchantController {
    private final MerchantRepository merchantRepository;

    public MerchantController(MerchantRepository merchantRepository) {
        this.merchantRepository = merchantRepository;
    }

    @GetMapping
    public List<Merchant> list() { return merchantRepository.findAll(); }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody Merchant m) {
        Merchant saved = merchantRepository.save(m);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Merchant m) {
        return merchantRepository.findById(id).map(existing -> {
            if (m.getName() != null) existing.setName(m.getName());
            if (m.getEmail() != null) existing.setEmail(m.getEmail());
            if (m.getSales() != null) existing.setSales(m.getSales());
            if (m.getRating() != null) existing.setRating(m.getRating());
            merchantRepository.save(existing);
            return ResponseEntity.ok(existing);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        merchantRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
