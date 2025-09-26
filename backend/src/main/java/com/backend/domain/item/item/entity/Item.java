package com.backend.domain.item.item.entity;

import com.backend.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item extends BaseEntity {
    @Column(nullable = false, length = 100)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String content;

    private int price;

    @Column(name = "image_url")
    private String imageUrl;

    public Item(String name, String content, int price, String imageUrl) {
        this.name = name;
        this.content = content;
        this.price = price;
        this.imageUrl = imageUrl;
    }
}
