package com.vdc.hrservice.hr.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestPw {
    private String password;
    private String newPassword;
}
