package com.backend.domain.orders.orders.controller;

import com.backend.domain.orders.orders.dto.OrdersDto;
import com.backend.domain.orders.orders.entity.Orders;
import com.backend.domain.orders.orders.service.OrdersService;
import com.backend.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/v1/admin/orders")
@RequiredArgsConstructor
@Tag(name="Orders", description = "관리자 주문 컨트롤러")
public class AdminOrderController {

    private final OrdersService ordersService;

    @GetMapping
    @Operation(summary = "관리자 주문 다건 조회")
    public RsData<List<OrdersDto.OrdersResponse>> readOrders(
            @RequestParam String email) {
        List<Orders> ordersList = ordersService.findAll();

        // Orders → DTO 변환
        List<OrdersDto.OrdersResponse> response = ordersList.stream()
                .map(order -> new OrdersDto.OrdersResponse(
                        order.getId(),
                        order.getAddress(),
                        order.getOrderItems().stream()
                                .map(item -> new OrdersDto.OrderItemResponse(
                                        item.getItem().getId(),
                                        item.getQuantity()
                                ))
                                .toList()
                ))
                .toList();

        return new RsData<>("200-1",
                "관리자 주문 목록 조회",
                response
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "관리자 주문 단건 조회")
    public RsData<OrdersDto.OrdersDetailResponse> readOrder(@PathVariable Long id) {
        Orders order = ordersService.findById(id)
                .orElseThrow(() -> new NoSuchElementException("주문을 찾을 수 없습니다. id=" + id));

        OrdersDto.OrdersDetailResponse response = new OrdersDto.OrdersDetailResponse(
                order.getId(),
                order.getMember().getEmail(),
                order.getAddress(),
                order.getStatus().name(),
                order.getCreateDate(),
                order.getDeliveryDate(),
                order.getOrderItems().stream()
                        .map(oi -> new OrdersDto.OrderItemResponse(
                                oi.getItem().getId(),
                                oi.getQuantity()
                        ))
                        .toList()
        );

        return new RsData<>(
                "200-1",
                "관리자 %d번 주문 단건 조회".formatted(id),
                response
        );
    }
}
