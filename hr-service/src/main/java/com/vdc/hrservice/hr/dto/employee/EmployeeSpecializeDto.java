package com.vdc.hrservice.hr.dto.employee;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeSpecialize;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeSpecializeDto {
  private Long id;

  private String specialize;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private Date usageTime;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private Date lastUsedTime;
  
  private String note;

  private Long employeeId;

  @JsonIgnore
  private EmployeeDto employee;

  public static EmployeeSpecializeDto of(EmployeeSpecialize specialize) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(specialize, EmployeeSpecializeDto.class);
  }
}
