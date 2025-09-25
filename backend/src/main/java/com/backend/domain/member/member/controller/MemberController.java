package com.backend.domain.member.member.controller;


import com.backend.domain.member.member.dto.LoginRequest;
import com.backend.domain.member.member.dto.LoginResponse;
import com.backend.domain.member.member.dto.MemberDto;
import com.backend.domain.member.member.entity.Member;
import com.backend.domain.member.member.service.MemberService;
import com.backend.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin")
@Tag(name="Member", description = "멤버 컨트롤러")
public class MemberController {

    private final MemberService memberService;


    @PostMapping("/login")
    @Operation(summary = "로그인")
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

    @DeleteMapping("/logout")
    @Operation(summary = "로그아웃")
    public RsData<Void> logout(){
        return new RsData<>(
                "200-1",
                "로그아웃 되었습니다."
        );

    }

}
