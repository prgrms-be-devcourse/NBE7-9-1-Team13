package com.backend.domain.orderitem.orderitem.dto;

public class OrderItemDto {

	private Long itemId;   // 실제 Item 엔티티 ID
	private int quantity;  // 수량

	public OrderItemDto() {
		// 기본 생성자 (Jackson, JPA 테스트용)
	}

	public OrderItemDto(Long itemId, int quantity) {
		this.itemId = itemId;
		this.quantity = quantity;
	}

	// getter / setter
	public Long getItemId() {
		return itemId;
	}

	public void setItemId(Long itemId) {
		this.itemId = itemId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
}