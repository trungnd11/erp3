package com.vdc.authservice.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

import lombok.Data;

@Data
public class UserChangePasswordDto {

    @NotBlank
    @NotEmpty
    private String password;

    @NotBlank
    @NotEmpty
    private String newPassword;
}
