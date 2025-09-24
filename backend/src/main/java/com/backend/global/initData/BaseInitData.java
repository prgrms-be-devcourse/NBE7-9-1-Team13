package com.backend.global.initData;


import com.backend.domain.member.member.entity.Member;
import com.backend.domain.member.member.role.Role;
import com.backend.domain.member.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {

    @Autowired
    @Lazy
    private BaseInitData self;
    private final MemberService memberService;

    @Bean
    ApplicationRunner initData(){

        return args -> {
            self.work1();
        };
    }

    //관리자는 미리 설정을 해두고 작업을 시작한다.
    @Transactional
    public void work1(){
        if(memberService.count() > 0){
            return;
        }

        Member admin = memberService.join("admin@naver.com", "admin", Role.ADMIN);
    }


}
