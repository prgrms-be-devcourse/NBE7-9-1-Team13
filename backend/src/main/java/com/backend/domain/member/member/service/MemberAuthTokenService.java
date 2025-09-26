package com.backend.domain.member.member.service;

import com.backend.domain.member.member.entity.Member;
import com.backend.global.jwt.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

//JwtUtil을 활용해 우리 프로젝트에 맞는 토큰발급/검증
@Service
@RequiredArgsConstructor
public class MemberAuthTokenService {

    @Value("${custom.jwt.secretPattern}")
    private String secretPattern;

    @Value("${custom.jwt.expire-seconds}")
    private long expireSeconds;


    //외부 패키지에서 접근하지 못하도록 접근제어자 default로 변경
    //토큰 생성
    String generateToken(Member member) {
        return JwtUtil.createToken(
                secretPattern,
                expireSeconds,
                Map.of(
                        "id", member.getId(),
                        "email", member.getEmail(),
                        "role", member.getRole().name()
                )
        );
    }

    Claims parseToken(String token) {
        return JwtUtil.parseToken(secretPattern, token);
    }


}
