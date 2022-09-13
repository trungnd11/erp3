package com.vdc.hrservice.hr.dto.employee;

import com.vdc.hrservice.hr.domain.employee.EmployeeEducation;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeEducationDto {
  private Long id;
  private String degree;
  private String course;
  private String schoolName;
  private String faculty;
  private String specialized;
  private String classification;
  private Long employeeId;
  private EmployeeDto employee;

  public static EmployeeEducationDto of(EmployeeEducation education) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(education, EmployeeEducationDto.class);
  }
}
