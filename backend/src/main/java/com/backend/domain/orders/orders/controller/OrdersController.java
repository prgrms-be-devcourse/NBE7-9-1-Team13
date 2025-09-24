package com.backend.domain.orders.orders.controller;


import com.backend.domain.orders.orders.dto.OrdersDto;
import com.backend.domain.orders.orders.entity.Orders;
import com.backend.domain.orders.orders.service.OrdersService;
import com.backend.global.rsData.RsData;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class OrdersController {

    private final OrdersService ordersService;

    @DeleteMapping("/{id}")
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