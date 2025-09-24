package com.backend.domain.orders.orders.service;

import com.backend.domain.orderitem.orderitem.entity.OrderItem;
import com.backend.domain.orders.orders.controller.OrdersController;
import com.backend.domain.orders.orders.dto.OrdersDto;
import com.backend.domain.orders.orders.entity.Orders;
import com.backend.domain.orders.orders.repository.OrdersRepository;
import com.backend.domain.product.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class OrdersService {

    private final OrdersRepository ordersRepository;

    public LocalDateTime calculateDeliveryDate(LocalDateTime now) {
        LocalTime cutoffTime = LocalTime.of(14, 0); // 오후 2시
        LocalDate today = now.toLocalDate();

        if (now.toLocalTime().isBefore(cutoffTime)) {
            // 오늘 2시 이전 주문 → 오늘 2시에 발송
            return LocalDateTime.of(today, cutoffTime);
        } else {
            // 오늘 2시 이후 주문 → 내일 2시에 발송
            return LocalDateTime.of(today.plusDays(1), cutoffTime);
        }
    }

    @Transactional
    public void deleteOrders(Orders orders) {
        ordersRepository.delete(orders);
    }


    public Optional<Orders> findById(Long id) {
        return ordersRepository.findById(id);
    }

    @Transactional
    public void modifyOrders(Orders orders, String address, List<OrdersDto.OrdersItemModifyReqBody> orderItems) {

        orders.setAddress(address);

        orders.getOrderItems().clear();

        for (OrdersDto.OrdersItemModifyReqBody newItem : orderItems) {

            Item item = itemRepository.findById(newItem.itemId())
                    .orElseThrow(() -> new RuntimeException("상품 없음"));

            OrderItem orderItem = new OrderItem();
            orderItem.setItem(item);
            orderItem.setQuantity(newItem.quantity());

            // 연관관계 편의 메서드 사용
            orders.addOrderItem(orderItem);
        }
    }
}
