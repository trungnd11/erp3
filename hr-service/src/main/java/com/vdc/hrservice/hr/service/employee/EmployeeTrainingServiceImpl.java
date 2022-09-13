package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeTraining;
import com.vdc.hrservice.hr.dto.employee.EmployeeTrainingDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeTrainingRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeTrainingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeTrainingServiceImpl implements EmployeeTrainingService {

  @Autowired
  EmployeeTrainingRepository trainingRepo;

  @Autowired
  EmployeeRepository employeeRepo;

  @Override
  public EmployeeTrainingDto createEmployeeTraining(EmployeeTrainingDto trainingDto) {
    EmployeeTraining training = new EmployeeTraining();
    training.setName(trainingDto.getName());
    training.setYearCompleted(trainingDto.getYearCompleted());
    training.setDegreeUnit(trainingDto.getDegreeUnit());
    training.setNote(trainingDto.getNote());
    training.setEmployee(employeeRepo.getById(trainingDto.getEmployeeId()));
    trainingRepo.save(training);
    return trainingDto;
  }

  @Override
  public int deleteEmployeesTraining(Long id) {
    EmployeeTraining training = trainingRepo.getById(id);
    training.setDelFlg(Constants.DELFLG_ONE);
    trainingRepo.save(training);
    return 1;
  }

  @Override
  public List<EmployeeTrainingDto> getEmployeesTraining() {
    List<EmployeeTraining> trainings = trainingRepo.findByDelFlg(Constants.DELFLG_ZERO);
    List<EmployeeTrainingDto> trainingsDto = trainings.stream().map(EmployeeTrainingDto::of)
        .collect(Collectors.toList());
    return trainingsDto;
  }

  @Override
  public List<EmployeeTrainingDto> getEmployeesTrainingById(Long id) {
    List<EmployeeTraining> trainings = trainingRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    List<EmployeeTrainingDto> trainingsDto = trainings.stream().map(EmployeeTrainingDto::of)
        .collect(Collectors.toList());
    return trainingsDto;
  }

  @Override
  public EmployeeTrainingDto updateEmployeeTraining(EmployeeTrainingDto trainingDto) {
    EmployeeTraining training = trainingRepo.getById(trainingDto.getId());
    training.setName(trainingDto.getName());
    training.setYearCompleted(trainingDto.getYearCompleted());
    training.setDegreeUnit(trainingDto.getDegreeUnit());
    training.setNote(trainingDto.getNote());
    trainingRepo.save(training);
    return trainingDto;
  }
  
}
