package com.backend.domain.orders.orders.repository;

import com.backend.domain.orders.orders.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
}
