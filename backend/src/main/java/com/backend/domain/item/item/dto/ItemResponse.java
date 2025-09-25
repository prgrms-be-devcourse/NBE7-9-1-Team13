package com.backend.domain.item.item.dto;

import com.backend.domain.item.item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ItemResponse {
    private Long id;
    private String name;
    private String content;
    private int price;
    private int stock;
    private String createdAt;
    private String updatedAt;

    public static ItemResponse fromEntity(Item item) {
        return new ItemResponse(
                item.getId(),
                item.getName(),
                item.getContent(),
                item.getPrice(),
                item.getStock(),
                item.getCreatedAt() != null ? item.getCreatedAt().toString() : null,
                item.getUpdatedAt() != null ? item.getUpdatedAt().toString() : null
        );
    }
}
