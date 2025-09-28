package com.backend.domain.orders.orders.repository;

import com.backend.domain.orders.orders.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByEmail(String email);
    List<Orders> findByStatus(Orders.Status status);

}
