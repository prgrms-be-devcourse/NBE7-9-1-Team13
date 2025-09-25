package com.backend.domain.orders.orders.controller;

import com.backend.domain.orders.orders.dto.OrdersDto;
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

    @DeleteMapping("/{id}")
    @Operation(summary = "주문 삭제")
    public RsData<Void> deleteOrders(
            @PathVariable Long id
    ) {
        Orders orders = ordersService.findById(id).get();
        ordersService.deleteOrders(orders);

        return new RsData<Void>(
                "200-1",
                "%d번 주문이 삭제되었습니다.".formatted(id)
        );
    }

    @PutMapping("/{id}")
    @Operation(summary = "주문 수정")
    @Transactional
    public RsData<Void> modifyOrders(
            @PathVariable Long id,
            @RequestBody OrdersDto.OrdersModifyReqBody reqBody
    ) {
        Orders orders = ordersService.findById(id).get();
        ordersService.modifyOrders(orders, reqBody.address(), reqBody.ordersItems());

        return new RsData(
                "200-1",
                "%d번 주문이 수정되었습니다.".formatted(id)
        );
    }
}