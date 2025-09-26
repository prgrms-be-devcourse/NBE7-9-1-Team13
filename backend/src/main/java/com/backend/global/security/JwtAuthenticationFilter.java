package com.backend.global.security;

import com.backend.domain.member.member.service.MemberAuthTokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    //JWT 토큰 검증
    private final MemberAuthTokenService memberAuthTokenService;

    //JWT 토큰을 꺼내고, 검증하고, 인증 객체를 만들어 SecurityContext에 저장
    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {


        String requestURI = request.getRequestURI();

        //관리자 로그인은 토큰 검사하지 않는다
        if(requestURI.equals("/api/v1/admin/login")){
            filterChain.doFilter(request,response);
            return;
        }

        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        //헤더가 없거나 "Bearer"로 시작하지 않으면 그냥  통과
        if(header == null || !header.startsWith("Bearer ")){
            filterChain.doFilter(request,response);
            return;
        }

        //Bearer이후의 토큰 값 추출
        String token = header.substring(7);

        try{

            //토큰 파싱 & 검증
            Claims claims = memberAuthTokenService.parseToken(token);
            Long memberId = claims.get("id", Long.class);
            String email = claims.get("email", String.class);
            String role = claims.get("role", String.class);

            //인증 객체 생성
            UserDetails user = User.withUsername(email)
                    .password("") //이미 검증되었기때문에 필요없다
                    .roles(role)
                    .build();

            //authentication 객체 생성 후 SecurityContext에 저장
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }catch(JwtException e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }
        filterChain.doFilter(request,response);
    }

}
