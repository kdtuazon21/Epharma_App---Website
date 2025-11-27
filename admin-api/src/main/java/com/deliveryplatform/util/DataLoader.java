package com.deliveryplatform.util;

import com.deliveryplatform.model.*;
import com.deliveryplatform.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Configuration
public class DataLoader {
    @Bean
    CommandLineRunner init(UserRepository userRepository,
                           MerchantRepository merchantRepository,
                           DriverRepository driverRepository,
                           OrderRepository orderRepository,
                           PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.findByEmail("admin@platform.local").isEmpty()) {
                User admin = new User();
                admin.setEmail("admin@platform.local");
                admin.setPassword(passwordEncoder.encode("adminpassword"));
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
            }

            if (merchantRepository.count() == 0) {
                Merchant m1 = new Merchant(); m1.setName("MediCare Pharmacy"); m1.setEmail("contact@medicare.com"); m1.setSales(350000.0); m1.setRating(4.7);
                Merchant m2 = new Merchant(); m2.setName("HealthPlus"); m2.setEmail("owner@healthplus.ph"); m2.setSales(210000.0); m2.setRating(4.5);
                merchantRepository.save(m1); merchantRepository.save(m2);
            }

            if (driverRepository.count() == 0) {
                Driver d1 = new Driver(); d1.setName("Juan Dela Cruz"); d1.setEmail("juan@drivers.ph"); d1.setDeliveries(850); d1.setRating(4.8);
                Driver d2 = new Driver(); d2.setName("Maria Santos"); d2.setEmail("maria@drivers.ph"); d2.setDeliveries(620); d2.setRating(4.6);
                driverRepository.save(d1); driverRepository.save(d2);
            }

            if (orderRepository.count() == 0) {
                OrderEntity o1 = new OrderEntity(); o1.setMerchant("MediCare Pharmacy"); o1.setCustomer("John Doe"); o1.setTotal(450.0); o1.setStatus("Delivered"); o1.setDate(LocalDate.of(2025,11,25));
                OrderEntity o2 = new OrderEntity(); o2.setMerchant("HealthPlus"); o2.setCustomer("Jane Smith"); o2.setTotal(1200.0); o2.setStatus("In Transit"); o2.setDate(LocalDate.of(2025,11,26));
                orderRepository.save(o1); orderRepository.save(o2);
            }
        };
    }
}
