package com.backend.global.springDoc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

//swagger 문서를 만들어주는 역할
@Configuration
@OpenAPIDefinition(info= @Info(title ="API 서버", version ="beta", description = "API 서버 문서입니다"))
@SecurityScheme(
        name="bearerAuth",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        scheme = "bearer"
)
public class SpringDoc {

//    //그룹화 - api 여부
//    @Bean
//    public GroupedOpenApi groupApiV1() {
//        return GroupedOpenApi.builder()
//                .group("apiV1")
//                .pathsToMatch("/api/v1/**")
//                .build();
//    }
//
//    @Bean
//    public GroupedOpenApi groupController() {
//        return GroupedOpenApi.builder()
//                .group("home")
//                .pathsToExclude("/api/**")
//                .build();
//    }
}
