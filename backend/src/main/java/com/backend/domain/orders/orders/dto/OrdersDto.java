package com.backend.domain.orders.orders.dto;

import java.util.List;

public class OrdersDto {

    public record OrdersItemModifyReqBody(
            Long itemId,
            int quantity
    ) {}

    public record OrdersModifyReqBody(
            String address,
            List<OrdersItemModifyReqBody> ordersItems
    ) {}

}
