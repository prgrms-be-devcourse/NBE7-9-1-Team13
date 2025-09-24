package com.backend.domain.member.member.dto;

import com.backend.domain.member.member.entity.Member;

public record LoginResponse(MemberDto memberDto) {
    public LoginResponse(Member member){
        this(new MemberDto(member));
    }
}
