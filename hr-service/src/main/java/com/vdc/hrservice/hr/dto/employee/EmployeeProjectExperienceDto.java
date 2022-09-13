package com.vdc.hrservice.hr.dto.employee;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeProjectExperience;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeProjectExperienceDto {
  private Long id;
  private String name;
  private String description;
  private String startYear;
  private Long projectTime;
  private Long numberPeople;
  private String position;
  private String jobDescription;
  private String technologyUsed;
  private String implementationCompany;
  private String customer;
  private Long employeeId;
  @JsonIgnore
  private EmployeeDto employee;

  public static EmployeeProjectExperienceDto of(EmployeeProjectExperience project) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(project, EmployeeProjectExperienceDto.class);
  }
}
