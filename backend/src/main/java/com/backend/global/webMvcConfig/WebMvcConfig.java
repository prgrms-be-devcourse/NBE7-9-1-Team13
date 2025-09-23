package com.backend.global.webMvcConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//프론트엔드와 백엔드가 다른 도메인(출처)에서 통신할 때
//발생하는 CORS 문제를 해결하기 위해 사용
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("api/**")
                .allowedOrigins("https://cdpn.io", "http://localhost:3000") //허용할 출처
                .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH","OPTIONS") //허용할 메소드
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}