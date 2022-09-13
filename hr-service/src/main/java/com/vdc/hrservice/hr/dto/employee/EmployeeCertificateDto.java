package com.vdc.hrservice.hr.dto.employee;

import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeCertificate;

import org.modelmapper.ModelMapper;
import org.springframework.ui.ModelMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeCertificateDto {
  private Long id;
  private String name;
  private String yearCompleted;
  private String degreeUnit;
  private String note;
  private Long employeeId;
  private EmployeeDto employee;

  public static EmployeeCertificateDto of(EmployeeCertificate certificate) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(certificate, EmployeeCertificateDto.class);
  }
}
