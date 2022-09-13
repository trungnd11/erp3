package com.vdc.hrservice.hr.dto.employee;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RequestUser {
    private String fullName;
    private Long positionId;
}
