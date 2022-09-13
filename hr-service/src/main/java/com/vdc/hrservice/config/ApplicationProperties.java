package com.vdc.hrservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

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

    @Value("${sp-admin.username}")
    private String adminUsername;

    @Value("${sp-admin.password}")
    private String adminPassword;
}
