package com.backend.domain.member.member.dto;

import com.backend.domain.member.member.entity.Member;

public record MemberDto(
    Long id,
    String email,
    String role
){
    public MemberDto(Member member){
        this(
            member.getId(),
            member.getEmail(),
            member.getRole().name()
        );
    }
}