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
    private String imageUrl;
    private String createdAt;
    private String updatedAt;

    public static ItemResponse fromEntity(Item item) {
        return new ItemResponse(
                item.getId(),
                item.getName(),
                item.getContent(),
                item.getPrice(),
                item.getImageUrl(),
                item.getCreateDate() != null ? item.getCreateDate().toString() : null,
                item.getModifyDate() != null ? item.getModifyDate().toString() : null
        );
    }

}
