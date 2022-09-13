package com.vdc.hrservice.hr.dto.employee;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeUserDto {
    private Long id;
    private String username;
    private String employeeCode;
    private String fullname;
    private String department;
    private Instant createdAt;
    private Instant activedAt;
}
