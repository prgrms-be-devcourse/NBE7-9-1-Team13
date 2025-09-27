package com.backend.global.initData;

import com.backend.domain.item.item.entity.Item;
import com.backend.domain.item.item.repository.ItemRepository;
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
            itemRepository.save(new Item("케냐 AA Plus 오타야 (500g)", "과일향과 꽃향기 그리고 세련된 후미와 간결한 바디가 특징이며 전체적인 발란스가 좋은 커피", 21000, "/kenya.jpg"));
            itemRepository.save(new Item("에티오피아 예가체프 (500g)", "살구,사과,딸기 등 상쾌한 과실향이 강한 커피", 21000, "/eth.jpeg"));
            itemRepository.save(new Item("고도의 시간 (500g)", "견과류의 풍부한 고소함이 특징이며 가볍게 즐기기 가장 좋은 커피", 16000, "/good.jpg"));
            itemRepository.save(new Item("컬러인 클래식 (500g)", "고소한 호두와 아몬드 향과, 오렌지 살구 등 시트러스 향과 어우러져 상쾌한 신맛과 중후한 바디감의 맛으로 표현된 커피", 24000, "/classic.jpg"));
        }
    }


}
