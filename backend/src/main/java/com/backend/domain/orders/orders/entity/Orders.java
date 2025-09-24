package com.backend.domain.orders.orders.entity;

import java.time.LocalDateTime;

import com.backend.domain.member.member.entity.Member;
import com.backend.global.jpa.entity.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Orders extends BaseEntity {

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;
	private String address;
	private LocalDateTime deliveryDate;

	public enum Status {
		DELIVERY,
		ORDERED,
		CANCELLED
	}
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Status status = Status.ORDERED;

	public void initializeDeliveryDateWhen(Status status) {
		this.status = status;

		if (status == Status.DELIVERY) {
			this.deliveryDate = getModifyDate();
		}
	}


}
