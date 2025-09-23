package com.backend.domain.product.product.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;  // 상품 이름

    @Column(columnDefinition = "TEXT")
    private String description;  // 상세 설명

    @Column(nullable = false)
    private int price;  // 가격

    @Column(name = "image_url")
    private String imageUrl;  // 상품 이미지 경로

}
