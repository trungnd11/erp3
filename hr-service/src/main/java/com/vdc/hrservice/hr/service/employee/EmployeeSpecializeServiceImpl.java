package com.vdc.hrservice.hr.service.employee;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeSpecialize;
import com.vdc.hrservice.hr.dto.employee.EmployeeSpecializeDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeSpecializeRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeSpecializeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeSpecializeServiceImpl implements EmployeeSpecializeService {

  @Autowired
  EmployeeSpecializeRepository specializeRepo;

  @Autowired
  EmployeeRepository employeeRepo;

  @Override
  public EmployeeSpecializeDto createSpecialize(EmployeeSpecializeDto specializeDto) {
    EmployeeSpecialize specialize = new EmployeeSpecialize();
    specialize.setEmployee(employeeRepo.getById(specializeDto.getEmployeeId()));
    specialize.setSpecialize(specializeDto.getSpecialize());
    specialize.setUsageTime(specializeDto.getUsageTime());
    specialize.setLastUsedTime(specializeDto.getLastUsedTime());
    specialize.setNote(specializeDto.getNote());
    specializeRepo.save(specialize);
    return specializeDto;
  }

  @Override
  public int deleteSpecialize(Long id) {
    EmployeeSpecialize specialize = specializeRepo.getById(id);
    specialize.setDelFlg(Constants.DELFLG_ONE);
    specializeRepo.save(specialize);
    return 1;
  }

  @Override
  public List<EmployeeSpecializeDto> getSpecializes() {
    List<EmployeeSpecialize> specializes = specializeRepo.findByDelFlg(Constants.DELFLG_ZERO);
    return specializes.stream().map(EmployeeSpecializeDto::of).collect(Collectors.toList());
  }

  @Override
  public List<EmployeeSpecializeDto> getSpecializesById(Long id) {
    List<EmployeeSpecialize> specializes = specializeRepo.findByEmployeeIdAndDelFlg(id, Constants.DELFLG_ZERO);
    return specializes.stream().map(EmployeeSpecializeDto::of).collect(Collectors.toList());
  }

  @Override
  public EmployeeSpecializeDto updateSpecialize(EmployeeSpecializeDto specializeDto) {
    EmployeeSpecialize specialize = specializeRepo.getById(specializeDto.getId());
    specialize.setSpecialize(specializeDto.getSpecialize());
    specialize.setUsageTime(specializeDto.getUsageTime());
    specialize.setLastUsedTime(specializeDto.getLastUsedTime());
    specialize.setNote(specializeDto.getNote());
    specializeRepo.save(specialize);
    return specializeDto;
  }
  
}
