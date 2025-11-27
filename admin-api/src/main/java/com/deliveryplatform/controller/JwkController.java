package com.deliveryplatform.controller;

import com.deliveryplatform.security.JwtKeyStore;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class JwkController {

    @Autowired
    private JwtKeyStore jwtKeyStore;

    @GetMapping("/jwks")
    public ResponseEntity<Map<String, Object>> getPublicKeySet() {
        return ResponseEntity.ok(jwtKeyStore.getPublicKeySet());
    }
}
