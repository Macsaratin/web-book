package com.backend.bookwed.payloads;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long productId;
    private String productName;
    private String image;
    private String description;
    private Integer quantity;
    private double price;
    private double discount;

    private CategoryDTO category;
    private LocalDate releaseDate;
    private String bookCondition;
    private String publisher;
    private Integer status;
    public double getPricesale() {
        return price - (price * discount / 100);
    }
    private int purchasedQuantity;
}
