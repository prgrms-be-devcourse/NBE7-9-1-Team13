package com.backend.global.springDoc;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
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

}
