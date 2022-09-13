package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeProjectExperience;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeProjectRepository extends JpaRepository<EmployeeProjectExperience, Long> {
   // list education by delFlg
  List<EmployeeProjectExperience> findByDelFlg(Boolean delFlg);
  
  // list education by employeeId and delFlg
  List<EmployeeProjectExperience> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
