package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeForeignLanguage;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeLanguageRepository extends JpaRepository<EmployeeForeignLanguage, Long> {
  // list education by delFlg
  List<EmployeeForeignLanguage> findByDelFlg(Boolean delFlg);
  
  // list education by employeeId and delFlg
  List<EmployeeForeignLanguage> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
