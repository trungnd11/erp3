package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.dto.employee.EmployeeWorkingDto;

public interface EmployeeWorkingService {
  public abstract List<EmployeeWorkingDto> getListWorking();
  public abstract List<EmployeeWorkingDto> getListWorkingById(Long id);
  public abstract EmployeeWorkingDto createWorking(EmployeeWorkingDto workingDto);
  public abstract EmployeeWorkingDto updateWorking(EmployeeWorkingDto workingDto);
  public abstract int deleteWorking(Long id);
}
