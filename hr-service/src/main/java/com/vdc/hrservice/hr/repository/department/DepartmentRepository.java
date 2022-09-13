package com.vdc.hrservice.hr.repository.department;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.hr.domain.department.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
  @Query(value = "SELECT * FROM `department` WHERE del_flg = 0 ORDER BY `department`.`position` ASC", nativeQuery = true)
  List<Department> listDepartment();

  @Query(value = "SELECT * FROM `department` where del_flg=0 and name like UPPER(CONCAT('%',:key,'%'))", nativeQuery = true)
  List<Department> findByDepartmentName(@Param("key") String name);

  List<Department> findDistinctByNameContainingAndLocations_locationContaining(String name, String location);

  Optional<Department> findByIdAndDelFlgIsFalse(Long id);
}