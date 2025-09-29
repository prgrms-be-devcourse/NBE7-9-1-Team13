package com.backend.domain.orders.orders.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.backend.domain.member.member.entity.Member;
import com.backend.domain.orderitem.orderitem.entity.OrderItem;
import com.backend.global.jpa.entity.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Orders extends BaseEntity {

	private String address;
    private String email;

    public enum Status {
        DELIVERED,
        ORDERED,
        CANCELLED
    }
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status = Status.ORDERED;

    private LocalDateTime deliveryDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = true)
    private Member member;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    public void addOrderItem(OrderItem orderItem) {
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    public void setDeliveryDate() {
        LocalDateTime now = LocalDateTime.now();

        // 오늘 오후 2시 (14:00:00)
        LocalDateTime today2PM = now.withHour(14).withMinute(0).withSecond(0).withNano(0);

        if (now.isBefore(today2PM)) {
            // 오후 2시 이전 주문 → 오늘 2시
            this.deliveryDate = today2PM;
        } else {
            // 오후 2시 이후 주문 → 내일 2시
            this.deliveryDate = today2PM.plusDays(1);
        }
    }

}
