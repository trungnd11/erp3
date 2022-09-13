package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeCertificate;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeCertificateRepository extends JpaRepository<EmployeeCertificate, Long> {

  // list Certificate
  List<EmployeeCertificate> findByDelFlg(Boolean delFlg);

  // list Certificate By EmployeeId
  List<EmployeeCertificate> findByEmployeeIdAndDelFlg(Long id, Boolean delFlg);
}
