package com.backend.global.initData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.transaction.annotation.Transactional;

import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.repository.ItemRepository;
import com.backend.domain.member.member.role.Role;
import com.backend.domain.member.member.service.MemberService;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class BaseInitData {

    @Autowired
    @Lazy
    private BaseInitData self;

    private final MemberService memberService;
    private final ItemRepository itemRepository;

    @Bean
    ApplicationRunner initData() {
        return args -> {
            self.work1();
        };
    }

    @Transactional
    public void work1() {
        // 회원 초기화
        if (memberService.count() == 0) {
            memberService.join("admin@naver.com", "admin", Role.ADMIN);
        }

        // 상품 초기화 (기본 원두 4개)
        if (itemRepository.count() == 0) {
            itemRepository.save(new Item("콜롬비아 수프리모", "밸런스가 좋은 커피 원두", 12000, "/images/colombia.png"));
            itemRepository.save(new Item("에티오피아 예가체프", "꽃향과 산미가 특징인 원두", 14000, "/images/ethiopia.png"));
            itemRepository.save(new Item("케냐 AA", "풍부한 바디감과 강한 풍미", 15000, "/images/kenya.png"));
            itemRepository.save(new Item("브라질 산토스", "견과류 향과 부드러운 맛", 11000, "/images/brazil.png"));
        }
    }
}
