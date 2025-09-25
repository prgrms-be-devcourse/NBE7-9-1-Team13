package com.backend.domain.item.item.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemCreateRequest {
    private String name;
    private String content;
    private int price;
    private String imageUrl;
}
