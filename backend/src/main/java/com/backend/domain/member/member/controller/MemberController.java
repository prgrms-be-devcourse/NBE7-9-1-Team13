package com.backend.domain.member.member.controller;


import com.backend.domain.member.member.dto.LoginRequest;
import com.backend.domain.member.member.dto.LoginResponse;
import com.backend.domain.member.member.dto.MemberDto;
import com.backend.domain.member.member.entity.Member;
import com.backend.domain.member.member.service.MemberService;
import com.backend.global.rsData.RsData;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin")
public class MemberController {

    private final MemberService memberService;


    @PostMapping("/login")
    public RsData<MemberDto> login(
            @RequestBody @Valid LoginRequest loginRequest
    ){

        Member member = memberService.login(loginRequest.email(), loginRequest.password());
        return new RsData(
                "200-1",
                "로그인에 성공하셨습니다",
                new LoginResponse(member)
        );

    }

}
