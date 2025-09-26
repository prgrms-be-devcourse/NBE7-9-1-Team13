package com.backend.domain.orders.orders.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.domain.orders.orders.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Long> {
	List<Orders> findByEmail(String email);

}
