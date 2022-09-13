package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.employee.EmployeeSpecializeDto;

public interface EmployeeSpecializeService {
  public abstract List<EmployeeSpecializeDto> getSpecializes();
  public abstract List<EmployeeSpecializeDto> getSpecializesById(Long id);
  public abstract EmployeeSpecializeDto createSpecialize(EmployeeSpecializeDto specializeDto);
  public abstract EmployeeSpecializeDto updateSpecialize(EmployeeSpecializeDto specializeDto);
  public abstract int deleteSpecialize(Long id);
}
