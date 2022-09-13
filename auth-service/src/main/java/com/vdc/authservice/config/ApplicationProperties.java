package com.vdc.authservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.Data;

@Configuration
@Data
public class ApplicationProperties {
    @Value("${security.authentication.jwt.base64-secret}")
    private String base64Secret;

    @Value("${security.authentication.jwt.secret}")
    private String secret;

    @Value("${security.authentication.jwt.token-validity-in-seconds}")
    private Long tokenValidityInSeconds;

    @Value("${security.authentication.jwt.token-validity-in-seconds-for-remember-me}")
    private Long tokenValidityInSecondsForRememberMe;

    @Value("${security.content-security-policy}")
    private String contentSecurityPolicy;


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
