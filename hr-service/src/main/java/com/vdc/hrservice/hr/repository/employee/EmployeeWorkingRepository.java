package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeWorking;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeWorkingRepository extends JpaRepository<EmployeeWorking, Long> {
  // list education by delFlg
  List<EmployeeWorking> findByDelFlg(Boolean delFlg);
  
  // list education by employeeId and delFlg
  List<EmployeeWorking> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
