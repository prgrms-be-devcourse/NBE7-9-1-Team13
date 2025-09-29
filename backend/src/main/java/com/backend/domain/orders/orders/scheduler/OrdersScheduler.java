package com.backend.domain.orders.orders.scheduler;

import com.backend.domain.orders.orders.service.OrdersService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrdersScheduler {

    private final OrdersService ordersService;

    // 매일 오후 2시 실행 (cron 표현식: 초 분 시 일 월 요일)
    @Scheduled(cron = "0 0 14 * * ?")
    public void updateOrdersAt2PM() {
        ordersService.updateOrderedToDelivered();
    }
}
