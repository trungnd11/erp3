package com.vdc.hrservice.hr.dto.department;

import java.util.List;

import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.department.DepartmentLocation;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentDto {

  private Long id;
  private String code;
  private String name;
  private Long location;
  private Double budget;
  private DepartmentDto parent;
  private Long parentCode;
  private EmployeeDto manager;
  private Long managerCode;
  private Long level;
  private Long position;
  private String descriptions;
  private List<DepartmentLocation> locations;
  private List<Long> locationsId;
  private int employeeNumber;

  public static DepartmentDto of(Department part) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(part, DepartmentDto.class);
  }

}
