package com.backend.domain.member.member.entity;

import com.backend.domain.member.member.role.Role;
import com.backend.global.jpa.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
public class Member extends BaseEntity{

    @Column(unique = true)
    private String email;

    private String password; //고객은 null


    @Enumerated(EnumType.STRING)
    private Role role;
}
