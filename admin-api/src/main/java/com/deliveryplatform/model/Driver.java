package com.deliveryplatform.model;

import jakarta.persistence.*;

@Entity
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private Integer deliveries = 0;
    private Double rating = 0.0;

    public Driver() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Integer getDeliveries() { return deliveries; }
    public void setDeliveries(Integer deliveries) { this.deliveries = deliveries; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
