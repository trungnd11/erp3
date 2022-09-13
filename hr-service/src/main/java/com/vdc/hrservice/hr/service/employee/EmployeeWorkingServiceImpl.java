package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.EmployeeWorking;
import com.vdc.hrservice.hr.dto.employee.EmployeeWorkingDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeWorkingRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeWorkingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeWorkingServiceImpl implements EmployeeWorkingService {

  @Autowired
  EmployeeWorkingRepository workingRepo;

  @Autowired
  EmployeeRepository employeeRepo;


  @Override
  public EmployeeWorkingDto createWorking(EmployeeWorkingDto workingDto) {
    EmployeeWorking working = new EmployeeWorking();
    working.setCompany(workingDto.getCompany());
    working.setStartDate(workingDto.getStartDate());
    working.setFinishDate(workingDto.getFinishDate());
    working.setPosition(workingDto.getPosition());
    working.setSalary(workingDto.getSalary());
    working.setJobDescription(workingDto.getJobDescription());
    working.setEmployee(employeeRepo.getById(workingDto.getEmployeeId()));
    workingRepo.save(working);
    return workingDto;
  }

  @Override
  public int deleteWorking(Long id) {
    EmployeeWorking working = workingRepo.getById(id);
    working.setDelFlg(Constants.DELFLG_ONE);
    workingRepo.save(working);
    return 1;
  }

  @Override
  public List<EmployeeWorkingDto> getListWorking() {
    List<EmployeeWorking> listWork = workingRepo.findByDelFlg(Constants.DELFLG_ZERO);
    return listWork.stream().map(EmployeeWorkingDto::of).collect(Collectors.toList());
  }

  @Override
  public List<EmployeeWorkingDto> getListWorkingById(Long id) {
    List<EmployeeWorking> listWork = workingRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    return listWork.stream().map(EmployeeWorkingDto::of).collect(Collectors.toList());
  }

  @Override
  public EmployeeWorkingDto updateWorking(EmployeeWorkingDto workingDto) {
    EmployeeWorking working = workingRepo.getById(workingDto.getId());
    working.setCompany(workingDto.getCompany());
    working.setStartDate(workingDto.getStartDate());
    working.setFinishDate(workingDto.getFinishDate());
    working.setPosition(workingDto.getPosition());
    working.setSalary(workingDto.getSalary());
    working.setJobDescription(workingDto.getJobDescription());
    workingRepo.save(working);
    return workingDto;
  }
  
}
