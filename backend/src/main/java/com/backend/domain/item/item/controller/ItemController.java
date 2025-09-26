package com.backend.domain.item.item.controller;

import com.backend.domain.item.item.dto.ItemResponse;
import com.backend.domain.item.item.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    // 상품 생성
//    @PostMapping
//    @Operation(summary = "상품 생성")
//    public ResponseEntity<ItemResponse> createItem(@RequestBody ItemCreateRequest request) {
//        ItemResponse created = itemService.createItem(request);
//        return ResponseEntity.status(HttpStatus.CREATED).body(created);
//    }
    // 전체 상품 조회
    @GetMapping
    @Operation(summary = "전체 상품 조회")
    public ResponseEntity<List<ItemResponse>> getAllItems() {
        List<ItemResponse> items = itemService.getAllItems();
        return ResponseEntity.ok(items);
    }

//    @PutMapping("/{id}")
//    @Operation(summary = "상품 정보 수정")
//    public ResponseEntity<ItemResponse> updateItem(
//            @PathVariable Long id,
//            @RequestBody ItemUpdateRequest request
//    ) {
//        Item updated = itemService.updateItem(
//                id,
//                request.getName(),
//                request.getContent(),
//                request.getPrice()
//        );
//        return ResponseEntity.ok(ItemResponse.fromEntity(updated));
//    }
//
//    @DeleteMapping("/{id}")
//    @Operation(summary = "상품 삭제")
//    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
//        itemService.deleteItem(id);
//        return ResponseEntity.noContent().build();
//    }
}
