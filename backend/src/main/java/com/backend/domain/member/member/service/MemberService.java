package com.backend.domain.member.member.service;

import com.backend.domain.member.member.entity.Member;
import com.backend.domain.member.member.repository.MemberRepository;
import com.backend.domain.member.member.role.Role;
import com.backend.global.exception.ServiceException;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAuthTokenService memberAuthTokenService;

    public Member join(String email, String password, Role role) {
        Member member = Member.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(role)
                .build();
        return memberRepository.save(member);
    }

    public Member login(String email, String password) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(
                        () -> new ServiceException("401-1", "아이디가 틀렸습니다.")
                );

        checkPassword(password, member.getPassword());
        return member;
    }

    public void checkPassword(String inputPassword, String password){
        if(!passwordEncoder.matches(inputPassword, password)){
            throw new ServiceException("401-2", "비밀번호가 일치하지 않습니다.");
        }
    }

    public long count() {
        return memberRepository.count();
    }

    public String generateToken(Member member) {
        return memberAuthTokenService.generateToken(member);
    }

    public Claims parseToken(String token) {
        return memberAuthTokenService.parseToken(token);
    }
}
