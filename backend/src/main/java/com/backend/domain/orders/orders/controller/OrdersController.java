package com.backend.domain.orders.orders.controller;

import com.backend.domain.orders.orders.dto.OrdersDto;
import com.backend.domain.orders.orders.dto.OrdersModifyReqDto;
import com.backend.domain.orders.orders.entity.Orders;
import com.backend.domain.orders.orders.service.OrdersService;
import com.backend.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("api/v1/orders")
@RequiredArgsConstructor
@Tag(name="Orders", description = "주문 컨트롤러")
public class OrdersController {

    private final OrdersService ordersService;

    @PostMapping
    @Operation(summary = "주문 생성")
    public RsData<LocalDateTime> createOrders(
        @RequestBody OrdersDto.OrdersCreateReqBody request
    ) {
        LocalDateTime deliveryDate = ordersService.createOrders(request);
        return new RsData<>(
            "200-1",
            "주문이 생성되었습니다.",
            deliveryDate
        );
    }

    @GetMapping
    @Operation(summary = "주문 다건 조회")
    public RsData<List<OrdersDto.OrdersResponse>> readOrders(
        @RequestParam String email) {
        List<Orders> ordersList = ordersService.readOrders(email);

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
            "주문 목록 조회",
            response
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "주문 단건 조회")
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
                "%d번 주문 단건 조회".formatted(id),
                response
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "주문 수정")
    @Transactional
    public RsData<Void> modifyOrders(
            @PathVariable Long id,
            @RequestBody OrdersModifyReqDto request
            ) {
        Orders orders = ordersService.findById(id).get();
        ordersService.modifyOrders(orders, request.address());

        return new RsData(
                "200-1",
                "%d번 주문이 수정되었습니다.".formatted(id)
        );
    }

    @PatchMapping("/{id}")
    @Operation(summary = "주문 취소")
    @Transactional
    public RsData<Void> cancelOrders(
            @PathVariable Long id
    ) {
        Orders orders = ordersService.findById(id).get();
        orders.setStatus(Orders.Status.CANCELLED);

        return new RsData(
                "200-1",
                "%d번 주문이 취소되었습니다.".formatted(id)
        );
    }

}