package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeEducation;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeEducationRepository extends JpaRepository<EmployeeEducation, Long> {

  // list education by delFlg
  List<EmployeeEducation> findByDelFlg(Boolean delFlg);
  
  // list education by employeeId and delFlg
  List<EmployeeEducation> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
