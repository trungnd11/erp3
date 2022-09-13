package com.vdc.authservice.dto;

import lombok.Data;

@Data
public class RegisterUserDto {
    
    private String fullName;
    private Long positionId;
}
