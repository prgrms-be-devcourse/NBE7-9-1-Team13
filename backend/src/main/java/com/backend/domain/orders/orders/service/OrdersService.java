package com.backend.domain.orders.orders.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.service.ItemService;
import com.backend.domain.orderitem.orderitem.entity.OrderItem;
import com.backend.domain.orders.orders.dto.OrdersDto;
import com.backend.domain.orders.orders.entity.Orders;
import com.backend.domain.orders.orders.repository.OrdersRepository;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class OrdersService {

    private final OrdersRepository ordersRepository;
    private final ItemService itemService;

    @Transactional
    public LocalDateTime createOrders(OrdersDto.OrdersCreateReqBody request) {
        Orders orders = new Orders();
        orders.setAddress(request.address());
        orders.setEmail(request.email());
        orders.setDeliveryDate();

        List<OrderItem> orderItems = new ArrayList<>();
        for (OrdersDto.OrdersItemCreateReqBody newItem : request.orderItems()) {
            Item item = itemService.findById(newItem.productId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품"));

            OrderItem orderItem = new OrderItem();
            orderItem.setItem(item);
            orderItem.setQuantity(newItem.quantity());
            orderItem.setOrder(orders);

            orderItems.add(orderItem);
            orders.addOrderItem(orderItem);
        }

        ordersRepository.save(orders);

        return orders.getDeliveryDate();
    }

    @Transactional(readOnly = true)
    public List<Orders> readOrders(String email) {
        return ordersRepository.findByEmail(email);
    }

    @Transactional
    public void modifyOrders(Orders orders, String address) {

        orders.setAddress(address);

    }

    @Transactional
    public void deleteOrders(Orders orders) {
        ordersRepository.delete(orders);
    }

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

    public Optional<Orders> findById(Long id) {
        return ordersRepository.findById(id);
    }

    public List<Orders> findAll(){return ordersRepository.findAll();}

    @Transactional
    public void updateOrderedToDelivered() {
        List<Orders> ordersList = ordersRepository.findByStatus(Orders.Status.ORDERED);
        for (Orders order : ordersList) {
            order.setStatus(Orders.Status.DELIVERED);
            order.setDeliveryDate(LocalDateTime.now());
        }
    }
}