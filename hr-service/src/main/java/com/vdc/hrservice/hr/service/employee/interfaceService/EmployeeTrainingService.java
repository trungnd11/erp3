package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeTraining;
import com.vdc.hrservice.hr.dto.employee.EmployeeTrainingDto;

public interface EmployeeTrainingService {
  public abstract List<EmployeeTrainingDto> getEmployeesTraining();
  public abstract List<EmployeeTrainingDto> getEmployeesTrainingById(Long id);
  public abstract EmployeeTrainingDto createEmployeeTraining(EmployeeTrainingDto trainingDto);
  public abstract EmployeeTrainingDto updateEmployeeTraining(EmployeeTrainingDto trainingDto);
  public abstract int deleteEmployeesTraining(Long id);
}
