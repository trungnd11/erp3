package com.vdc.hrservice.hr.dto.employee;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeForeignLanguage;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeForeignLanguageDto {
  private Long id;
  private String name;
  private String useListen;
  private String useSpeak;
  private String useRead;
  private String understand;
  private String useWrite;
  private String note;
  private Long employeeId;
  @JsonIgnore
  private EmployeeDto employee;

  public static EmployeeForeignLanguageDto of(EmployeeForeignLanguage language) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(language, EmployeeForeignLanguageDto.class);
  }
}
