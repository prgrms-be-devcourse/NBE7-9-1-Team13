package com.backend.domain.member.member.controller;


import com.backend.domain.member.member.dto.LoginRequest;
import com.backend.domain.member.member.dto.LoginResponse;
import com.backend.domain.member.member.dto.MemberDto;
import com.backend.domain.member.member.entity.Member;
import com.backend.domain.member.member.service.MemberService;
import com.backend.global.rsData.RsData;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/admin")
@Tag(name="Member", description = "관리자 멤버 컨트롤러")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/login")
    @Operation(summary = "관리자 로그인")
    public RsData<MemberDto> login(
            @RequestBody @Valid LoginRequest loginRequest,
            HttpServletResponse response
    ){

        Member member = memberService.login(loginRequest.email(), loginRequest.password());

        String accessToken = memberService.generateToken(member);

        Cookie cookie = new Cookie("accessToken", accessToken);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setDomain("localhost");
        response.addCookie(cookie);

        response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);

        return new RsData(
                "200-1",
                "로그인에 성공하셨습니다",
                new LoginResponse(member, accessToken)
        );
    }

    @DeleteMapping("/logout")
    @Operation(summary = "관리자 로그아웃")
    public RsData<Void> logout(HttpServletResponse response) {

        Cookie cookie = new Cookie("accessToken", "");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setDomain("localhost");
        cookie.setMaxAge(0); // 즉시 만료

        response.addCookie(cookie);

        return new RsData<>(
                "200-1",
                "로그아웃 되었습니다."
        );
    }

}
