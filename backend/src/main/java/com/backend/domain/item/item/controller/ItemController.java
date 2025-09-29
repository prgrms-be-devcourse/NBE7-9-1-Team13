package com.backend.domain.item.item.controller;

import com.backend.domain.item.item.dto.ItemResponse;
import com.backend.domain.item.item.service.ItemService;
import com.backend.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
@RequiredArgsConstructor
@Tag(name="Item", description = "상품 컨트롤러")
public class ItemController {
    private final ItemService itemService;

    @GetMapping
    @Operation(summary = "전체 상품 조회")
    public RsData<List<ItemResponse>> getAllItems() {
        List<ItemResponse> items = itemService.getAllItems();
        return new RsData<>(
                "200-1",
                "상품 전체 조회 성공",
                items
        );
    }
}
