package com.backend.domain.item.item.controller;

import com.backend.domain.item.item.dto.ItemResponse;
import com.backend.domain.item.item.dto.ItemUpdateRequest;
import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PutMapping("/items/{id}")
    public ResponseEntity<ItemResponse> updateItem(
            @PathVariable Long id,
            @RequestBody ItemUpdateRequest request
    ) {g
        Item updated = itemService.updateItem(
                id,
                request.getName(),
                request.getContent(),
                request.getPrice(),
                request.getStock()
        );
        return ResponseEntity.ok(ItemResponse.fromEntity(updated));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
        return ResponseEntity.noContent().build();
    }
}
