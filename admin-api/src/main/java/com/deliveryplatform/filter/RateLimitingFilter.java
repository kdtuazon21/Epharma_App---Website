package com.deliveryplatform.filter;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final int MAX_REQUESTS_PER_MINUTE = 60;
    private static final long WINDOW_SIZE_MS = 60 * 1000; // 1 minute

    private final ConcurrentHashMap<String, RateLimitBucket> rateLimitMap = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String clientIp = getClientIp(request);
        RateLimitBucket bucket = rateLimitMap.computeIfAbsent(clientIp, k -> new RateLimitBucket());

        synchronized (bucket) {
            bucket.cleanup();
            if (bucket.getRequestCount() >= MAX_REQUESTS_PER_MINUTE) {
                response.setStatus(429);
                response.getWriter().write("{\"error\": \"Rate limit exceeded: 60 requests per minute\"}");
                return;
            }
            bucket.addRequest();
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        String xRealIp = request.getHeader("X-Real-IP");
        if (xRealIp != null && !xRealIp.isEmpty()) {
            return xRealIp;
        }
        return request.getRemoteAddr();
    }

    static class RateLimitBucket {
        private final ConcurrentHashMap<Long, Integer> requestTimestamps = new ConcurrentHashMap<>();

        void addRequest() {
            long currentTime = System.currentTimeMillis();
            requestTimestamps.put(currentTime, requestTimestamps.getOrDefault(currentTime, 0) + 1);
        }

        int getRequestCount() {
            return requestTimestamps.values().stream().mapToInt(Integer::intValue).sum();
        }

        void cleanup() {
            long currentTime = System.currentTimeMillis();
            long windowStart = currentTime - WINDOW_SIZE_MS;
            requestTimestamps.keys().asIterator().forEachRemaining(timestamp -> {
                if (timestamp < windowStart) {
                    requestTimestamps.remove(timestamp);
                }
            });
        }
    }
}
