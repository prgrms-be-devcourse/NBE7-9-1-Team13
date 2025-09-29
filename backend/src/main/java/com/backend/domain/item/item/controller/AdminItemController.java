package com.backend.domain.item.item.controller;

import com.backend.domain.item.item.dto.ItemCreateRequest;
import com.backend.domain.item.item.dto.ItemResponse;
import com.backend.domain.item.item.dto.ItemUpdateRequest;
import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.service.ItemService;
import com.backend.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin/items")
@RequiredArgsConstructor
@Tag(name="AdminItem", description = "관리자 상품 컨트롤러")
public class AdminItemController {

    private final ItemService itemService;


    @GetMapping
    @Operation(summary = "관리자용 전체 상품 조회")
    public RsData<List<ItemResponse>> getAllItems() {
        List<ItemResponse> items = itemService.getAllItems();
        return new RsData<>(
                "200-1",
                "상품 전체 조회 성공",
                items
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "관리자용 단일 상품 조회")
    public RsData<ItemResponse> getItemById(@PathVariable Long id) {
        ItemResponse item = itemService.getItemById(id);
        return new RsData<>(
                "200-2",
                "%d번 상품 조회 성공".formatted(id),
                item
        );
    }



    @PostMapping
    @Operation(summary = "관리자 상품 생성")
    public RsData<ItemResponse> createItem(
            @RequestBody ItemCreateRequest request)
    {
        ItemResponse created = itemService.createItem(request);
        return new RsData(
                "200-1",
                "상품 생성 성공",
                created
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "관리자 상품 수정")
    public RsData<ItemResponse> updateItem(
            @PathVariable Long id,
            @RequestBody ItemUpdateRequest request
    ){
        Item updated = itemService.updateItem(
                id,
                request.getName(),
                request.getContent(),
                request.getPrice()
        );

        return new RsData(
                "200-1",
                "%d번 상품 수정 성공".formatted(id),
                updated
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "관리자 상품 삭제")
    public RsData<Void> deleteItem(
            @PathVariable Long id
    ){
        itemService.deleteItem(id);

        return new RsData(
                "200-1",
                "%d번 상품 삭제 성공".formatted(id)
        );
    }

}
