package com.vdc.hrservice.hr.dto.employee;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeWorking;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeWorkingDto {
  private Long id;

  private String company;

  @JsonFormat(pattern = "yyyy-MM-dd")
  private Date startDate;
  
  @JsonFormat(pattern = "yyyy-MM-dd")
  private Date finishDate;

  private String position;

  private Long salary;

  private String jobDescription;

  private Long employeeId;
  @JsonIgnore
  private EmployeeDto employee;

  public static EmployeeWorkingDto of(EmployeeWorking working) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(working, EmployeeWorkingDto.class);
  }
}
