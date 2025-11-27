package com.deliveryplatform;

import com.deliveryplatform.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class AuthIntegrationTest {

    @Autowired
    UserRepository userRepository;

    @Test
    void contextLoadsAndSeededAdminExists() {
        var user = userRepository.findByEmail("admin@platform.local");
        assertThat(user).isPresent();
    }
}
