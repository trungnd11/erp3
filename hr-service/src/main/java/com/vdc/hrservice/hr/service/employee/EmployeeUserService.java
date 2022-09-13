package com.vdc.hrservice.hr.service.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vdc.hrservice.hr.dto.employee.EmployeeUserDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeUserRepository;


@Service
public class EmployeeUserService {
    
    @Autowired
    private EmployeeUserRepository employeeUserRepository;

    public Page<EmployeeUserDto> getEmployeeActive(String key, Pageable pageable){
        return employeeUserRepository.getEmployeeActive(key, pageable);
    }

    public Page<EmployeeUserDto> getEmployeeBlocked(String key, Pageable pageable){
        return employeeUserRepository.getEmployeeBlocked(key, pageable);
    }

    public Page<EmployeeUserDto> getEmployeeNotActive(String key, Pageable pageable){
        return employeeUserRepository.getEmployeeNotActive(key, pageable);
    }

}
