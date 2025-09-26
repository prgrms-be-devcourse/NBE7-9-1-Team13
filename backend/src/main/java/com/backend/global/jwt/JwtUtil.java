package com.backend.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ClaimsBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.Map;

//jwt 토큰 생성하고 검증하는 클래스
//jwt라이브러리를 직접 다루는 순수 기능 제공
public class JwtUtil {

    public static String createToken(
            String secret, long expireSeconds, Map<String, Object> body) {
        ClaimsBuilder claimsBuilder = Jwts.claims();

        for (Map.Entry<String, Object> entry : body.entrySet()) {
            claimsBuilder.add(entry.getKey(), entry.getValue());
        }

        //claim -> 토큰 안에 들어있는 정보(payload 부분)
        Claims claims = claimsBuilder.build();

        Date issuedAt = new Date();
        Date expirationTime = new Date(issuedAt.getTime() + expireSeconds * 1000);

        Key key = Keys.hmacShaKeyFor(secret.getBytes()); //secret을 HMAC-SHA 서명용 키로 변환

        return Jwts.builder()
                .claims(claims)
                .issuedAt(issuedAt) //토큰 발급 시간
                .expiration(expirationTime) //토큰 만료 시간
                .signWith(key)
                .compact();
    }

    //클라이언트가 준 jwt 토큰 해석
    //서명 검증하는 것
    public static Claims parseToken(String secret, String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
