package com.backend.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ClaimsBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.Map;

//jwt 토큰 생성하고 검증하는 클래스
public class JwtUtil {

    public static String createToken(
            String secret, long expireSeconds, Map<String, Object> body) {
        ClaimsBuilder claimsBuilder = Jwts.claims();

        for (Map.Entry<String, Object> entry : body.entrySet()) {
            claimsBuilder.add(entry.getKey(), entry.getValue());
        }

        Claims claims = claimsBuilder.build();

        Date issuedAt = new Date();
        Date expirationTime = new Date(issuedAt.getTime() + expireSeconds * 1000);

        Key key = Keys.hmacShaKeyFor(secret.getBytes());

        return Jwts.builder()
                .claims(claims)
                .issuedAt(issuedAt)
                .expiration(expirationTime)
                .signWith(key)
                .compact();
    }


    public static Claims parseToken(String secret, String token) {
        return Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
