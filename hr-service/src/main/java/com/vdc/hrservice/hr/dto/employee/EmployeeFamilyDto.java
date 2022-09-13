package com.vdc.hrservice.hr.dto.employee;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeFamily;

import org.mapstruct.ap.shaded.freemarker.template.SimpleDate;
import org.modelmapper.ModelMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeFamilyDto {
    private Long id;
    private String fullName;
    private String relationship;
    private String phone;
    private String address;
    private String job;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date birthday;
    private Long employeeId;
    private EmployeeDto employee;

  public static EmployeeFamilyDto of(EmployeeFamily employeeFamily) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(employeeFamily, EmployeeFamilyDto.class);
  }
}
