package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.employee.EmployeeEducationDto;

public interface EmployeeEducationService {
  public abstract List<EmployeeEducationDto> getEmployeeEducations();
  public abstract List<EmployeeEducationDto> getEmployeeEducationsById(Long id);
  public abstract EmployeeEducationDto createEmployeeEducation(EmployeeEducationDto education);
  public abstract EmployeeEducationDto updateEmployeeEducation(EmployeeEducationDto education);
  public abstract int deleteEmployeeEducation(Long id);
}
