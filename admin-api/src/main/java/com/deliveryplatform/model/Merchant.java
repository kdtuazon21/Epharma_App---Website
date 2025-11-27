package com.deliveryplatform.model;

import jakarta.persistence.*;

@Entity
public class Merchant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private Double sales = 0.0;
    private Double rating = 0.0;

    public Merchant() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public Double getSales() { return sales; }
    public void setSales(Double sales) { this.sales = sales; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
