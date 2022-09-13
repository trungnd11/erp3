package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeTraining;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeTrainingRepository extends JpaRepository<EmployeeTraining, Long> {
  // list Certificate
  List<EmployeeTraining> findByDelFlg(Boolean delFlg);

  // list Certificate By EmployeeId
  List<EmployeeTraining> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
