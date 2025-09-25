package com.backend.domain.item.item.service;


import com.backend.domain.item.item.dto.ItemCreateRequest;
import com.backend.domain.item.item.dto.ItemResponse;
import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemService {
    private final ItemRepository itemRepository;

    // 상품 생성 (Create)
    public ItemResponse createItem(ItemCreateRequest request) {
        Item item = new Item(
                request.getName(),
                request.getContent(),
                request.getPrice(),
                request.getImageUrl()
        );

        Item savedItem = itemRepository.save(item);
        return ItemResponse.fromEntity(savedItem);
    }

    public List<ItemResponse> getAllItems() {
        return itemRepository.findAll()
                .stream()
                .map(ItemResponse::fromEntity)
                .toList();
    }
    public Item updateItem(Long id, String name, String content, int price){
        Item item=this.itemRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("아이템을 찾을 수 없습니다. id="+ id));
        item.setName(name);
        item.setContent(content);
        item.setPrice(price);
        return itemRepository.save(item);
    }

    public void deleteItem(Long id){
        if(!itemRepository.existsById(id)){
            throw new NoSuchElementException("아이템을 찾을 수 없습니다. id="+id);
        }
        itemRepository.deleteById(id);
    }

    public Optional<Item> findById(Long id){
        return itemRepository.findById(id);
    }
}
