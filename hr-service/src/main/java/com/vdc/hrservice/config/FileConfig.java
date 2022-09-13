package com.vdc.hrservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

import lombok.Data;

@Configuration
@Data
public class FileConfig {
    
    @Value("${file.location}")
    private String location;

    @Value("${file.uri}")
    private String downloadUri;
}
