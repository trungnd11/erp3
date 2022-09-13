package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeSpecialize;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeSpecializeRepository extends JpaRepository<EmployeeSpecialize, Long> {
  // list education by delFlg
  List<EmployeeSpecialize> findByDelFlg(Boolean delFlg);
  
  // list education by employeeId and delFlg
  List<EmployeeSpecialize> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
