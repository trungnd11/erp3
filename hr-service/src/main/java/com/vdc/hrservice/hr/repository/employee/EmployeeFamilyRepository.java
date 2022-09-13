package com.vdc.hrservice.hr.repository.employee;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeFamily;

public interface EmployeeFamilyRepository extends JpaRepository<EmployeeFamily, Long> {
  List<EmployeeFamily> findByDelFlg(Boolean delflg);

  @Query(value = "SELECT * FROM employee_family WHERE del_flg = 0 AND employee_id = :id", nativeQuery = true)
  List<EmployeeFamily> listFamilyByEmployeeId(@Param("id") Long id);
}
