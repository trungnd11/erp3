package com.vdc.hrservice.hr.dto.employee;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeTraining;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeTrainingDto {
  private Long id;
  
  private String name;
  
  private String yearCompleted;
  
  private String degreeUnit;
  
  private String note;
  
  private Long employeeId;

  @JsonIgnore
  private EmployeeDto employee;

  public static EmployeeTrainingDto of(EmployeeTraining employeeTraining) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(employeeTraining, EmployeeTrainingDto.class);
  }
}
