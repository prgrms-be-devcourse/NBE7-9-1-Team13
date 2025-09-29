package com.backend.global.webMvcConfig;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry){
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000") //허용할 출처
                .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH","OPTIONS") //허용할 메소드
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}