package com.backend.domain.member.member.dto;

import com.backend.domain.member.member.entity.Member;

public record LoginResponse(
        MemberDto memberDto,
        String token
) {
    public LoginResponse(Member member, String token) {
        this(new MemberDto(member), token);
    }
}