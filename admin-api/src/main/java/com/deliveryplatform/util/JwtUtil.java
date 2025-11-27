package com.deliveryplatform.util;

import com.deliveryplatform.security.JwtKeyStore;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {
    @Value("${app.jwt.expiration-ms}")
    private long expirationMs;

    @Autowired
    private JwtKeyStore jwtKeyStore;

    public String generateAccessToken(String email, String role) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        String keyId = jwtKeyStore.getCurrentKeyId();
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .claim("kid", keyId)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtKeyStore.getCurrentKey().getEncoded())
                .compact();
    }

    public String generateRefreshToken(String email) {
        // Use a longer expiration (7 days)
        Date now = new Date();
        Date exp = new Date(now.getTime() + (7L * 24 * 60 * 60 * 1000));
        String keyId = jwtKeyStore.getCurrentKeyId();
        return Jwts.builder()
                .setSubject(email)
                .claim("kid", keyId)
                .setIssuedAt(now)
                .setExpiration(exp)
                .signWith(SignatureAlgorithm.HS256, jwtKeyStore.getCurrentKey().getEncoded())
                .compact();
    }
}
