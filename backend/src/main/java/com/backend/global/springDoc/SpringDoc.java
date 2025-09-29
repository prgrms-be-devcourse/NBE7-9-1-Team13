package com.backend.global.springDoc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//swagger 문서를 만들어주는 역할
@Configuration
@OpenAPIDefinition(info= @Info(title ="13팀 Grids & Circles API 서버", version ="v1", description = "13팀 1차 프로젝트 API 서버 문서입니다"))
@SecurityScheme(
        name="bearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class SpringDoc {

    // 사용자 관련 API 그룹
    @Bean
    public GroupedOpenApi commonApi() {
        return GroupedOpenApi.builder()
                .group("일반API") // swagger-ui에서 그룹 이름
                .pathsToMatch("/api/v1/orders/**","/api/v1/items/**" ) // 이 경로만 포함
                .build();
    }

    // 주문 관련 API 그룹
    @Bean
    public GroupedOpenApi adminApi() {
        return GroupedOpenApi.builder()
                .group("관리자API")
                .pathsToMatch("/api/v1/admin/**")
                .build();
    }

}
