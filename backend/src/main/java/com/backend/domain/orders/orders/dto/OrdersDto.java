package com.backend.domain.orders.orders.dto;

import java.util.List;

public class OrdersDto {
    public record OrdersCreateReqBody(
        String email,
        String address,
        List<OrdersItemCreateReqBody> orderItems
    ) {}

    public record OrdersItemCreateReqBody(
        Long productId,
        int quantity
    ) {}

    public record OrdersResponse(
        Long orderId,
        String address,
        List<OrderItemResponse> orderItems
    ) {}

    public record OrderItemResponse(
        Long itemId,
        int quantity
    ) {}


    public record OrdersItemModifyReqBody(
            Long itemId,
            int quantity
    ) {}

    public record OrdersModifyReqBody(
            String address,
            List<OrdersItemModifyReqBody> ordersItems
    ) {}
    public record OrdersDetailResponse(
            Long orderId,
            String email,
            String address,
            String status,
            java.time.LocalDateTime orderDate,
            java.time.LocalDateTime deliveryDate,
            List<OrderItemResponse> orderItems
    ) {}
}
