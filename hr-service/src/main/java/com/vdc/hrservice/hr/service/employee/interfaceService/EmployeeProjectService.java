package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.employee.EmployeeProjectExperienceDto;

public interface EmployeeProjectService {
  public abstract List<EmployeeProjectExperienceDto> getEmployeeProjetcs();
  public abstract List<EmployeeProjectExperienceDto> getEmployeeProjetcsById(Long id);
  public abstract EmployeeProjectExperienceDto createEmployeeProjetc(EmployeeProjectExperienceDto projectDto);
  public abstract EmployeeProjectExperienceDto updateEmployeeProjetc(EmployeeProjectExperienceDto projectDto);
  public abstract int deleteEmployeeProjetcs(Long id);
}
