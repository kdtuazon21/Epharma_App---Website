package com.deliveryplatform.security;

import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.*;

@Component
public class JwtKeyStore {

    @Value("${jwt.secret:mySecretKeyForSigningJWTTokens1234567890}")
    private String baseSecret;

    private final Map<String, SecretKey> keyStore = new LinkedHashMap<>();
    private String currentKeyId;

    public JwtKeyStore() {
        // Initialize with base key
        initializeKeys();
    }

    private void initializeKeys() {
        // Create 3 keys for rotation
        for (int i = 0; i < 3; i++) {
            String keyId = "key-" + (i + 1);
            String keySecret = baseSecret + "-" + keyId;
            SecretKeySpec key = new SecretKeySpec(keySecret.getBytes(), 0, 32, "HmacSHA256");
            keyStore.put(keyId, key);
        }
        currentKeyId = "key-1";
    }

    public SecretKey getCurrentKey() {
        return keyStore.get(currentKeyId);
    }

    public String getCurrentKeyId() {
        return currentKeyId;
    }

    public SecretKey getKey(String keyId) {
        return keyStore.get(keyId);
    }

    public void rotateKey() {
        int currentIndex = Integer.parseInt(currentKeyId.split("-")[1]);
        int nextIndex = (currentIndex % 3) + 1;
        currentKeyId = "key-" + nextIndex;
    }

    public Map<String, Object> getPublicKeySet() {
        List<Map<String, String>> keys = new ArrayList<>();
        for (String keyId : keyStore.keySet()) {
            Map<String, String> keyMeta = new HashMap<>();
            keyMeta.put("kty", "oct");
            keyMeta.put("kid", keyId);
            keyMeta.put("alg", "HS256");
            keys.add(keyMeta);
        }
        return Map.of("keys", keys);
    }
}
