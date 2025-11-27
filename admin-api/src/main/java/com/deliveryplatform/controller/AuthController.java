package com.deliveryplatform.controller;

import com.deliveryplatform.model.User;
import com.deliveryplatform.repository.UserRepository;
import com.deliveryplatform.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final com.deliveryplatform.repository.RefreshTokenRepository refreshTokenRepository;

    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil,
                          com.deliveryplatform.repository.RefreshTokenRepository refreshTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already in use"));
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if (user.getRole() == null || user.getRole().isBlank()) user.setRole("ROLE_USER");
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        return userRepository.findByEmail(email)
                .map(u -> {
                    if (!passwordEncoder.matches(password, u.getPassword())) {
                        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
                    }
                    String accessToken = jwtUtil.generateAccessToken(u.getEmail(), u.getRole());
                    String refreshTokenStr = jwtUtil.generateRefreshToken(u.getEmail());
                    // save refresh token
                    var rt = new com.deliveryplatform.model.RefreshToken();
                    rt.setToken(refreshTokenStr);
                    rt.setExpiryDate(java.time.Instant.now().plusSeconds(7 * 24 * 3600));
                    rt.setUser(u);
                    refreshTokenRepository.save(rt);
                    return ResponseEntity.ok(Map.of("accessToken", accessToken, "refreshToken", refreshTokenStr));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("message", "Invalid credentials")));
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        if (refreshToken == null) return ResponseEntity.badRequest().body(Map.of("message", "Missing refreshToken"));
        return refreshTokenRepository.findByToken(refreshToken)
                .map(rt -> {
                    if (rt.isRevoked() || rt.getExpiryDate().isBefore(java.time.Instant.now())) {
                        return ResponseEntity.status(401).body(Map.of("message", "Refresh token invalid or expired"));
                    }
                    String email = rt.getUser().getEmail();
                    // rotate refresh token: revoke old and issue new
                    rt.setRevoked(true);
                    refreshTokenRepository.save(rt);
                    String newRefreshToken = jwtUtil.generateRefreshToken(email);
                    com.deliveryplatform.model.RefreshToken newRt = new com.deliveryplatform.model.RefreshToken();
                    newRt.setToken(newRefreshToken);
                    newRt.setExpiryDate(java.time.Instant.now().plusSeconds(7 * 24 * 3600));
                    newRt.setUser(rt.getUser());
                    refreshTokenRepository.save(newRt);

                    String accessToken = jwtUtil.generateAccessToken(email, rt.getUser().getRole());
                    return ResponseEntity.ok(Map.of("accessToken", accessToken, "refreshToken", newRefreshToken));
                }).orElse(ResponseEntity.status(401).body(Map.of("message", "Refresh token not found")));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        if (refreshToken == null) return ResponseEntity.badRequest().body(Map.of("message", "Missing refreshToken"));
        refreshTokenRepository.findByToken(refreshToken).ifPresent(rt -> {
            rt.setRevoked(true);
            refreshTokenRepository.save(rt);
        });
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }
}
