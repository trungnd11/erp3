package com.vdc.hrservice.hr.dto.employee;

import java.time.Instant;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeUserDetail {
    
    private Long id;
    // private AccountInfo accountInfo;
    private String username;
    private Boolean active;
    private Instant createdAt;
    private Instant activedAt;

    // Personal info
    private String employeeCode;
    private String fullname;
    private String department;
    private String title;
    private String email;
    private String homeTown;
    private String phoneNumber;
    private Instant dob;

    private List<Long> roleIds;
}
