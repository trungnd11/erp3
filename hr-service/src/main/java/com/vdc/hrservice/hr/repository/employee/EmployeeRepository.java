package com.vdc.hrservice.hr.repository.employee;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
  Page<Employee> findByDelFlg(Boolean delFlg, Pageable page);

  Optional<Employee> findByIdAndDelFlg(Long id, Boolean delFlg);

  @Modifying
  @Transactional
  @Query(value = "UPDATE employee SET del_flg = 1 WHERE id = :id", nativeQuery = true)
  Integer deleteEmployee(@Param("id") Long id);

  @Query(value = "SELECT * FROM erp_dev.employee where department_id= :idDepartment AND employee_position_id= :idPosition", nativeQuery = true)
  List<Employee> findEmpHrID(@Param("idDepartment") Long idDepartment, @Param("idPosition") Long idPosition);

  @Query(value = "SELECT * FROM erp_dev.employee where employee_position_id= :idPosition", nativeQuery = true)
  List<Employee> findEmpHrIDall(@Param("idPosition") Long idPosition);

  @Query(value = "SELECT * FROM erp_dev.employee where del_flg=0 and  full_name like UPPER(CONCAT('%',:key,'%')) or employee_numb like UPPER(CONCAT('%',:key,'%'))", nativeQuery = true)
  Page<Employee> findFilterByKeyTextSearch(@Param("key") String key, Pageable pageable);

  List<Employee> findFirst15ByFullNameContainingIgnoreCaseAndDelFlgIsFalseOrEmployeeNumbContainingIgnoreCaseAndDelFlgIsFalse(
      String fullName, String employeeNumb);

  List<Employee> findAllByFullNameContainingIgnoreCaseAndDelFlgIsFalseOrEmployeeNumbContainingIgnoreCaseAndDelFlgIsFalse(
      String fullName, String employeeNumb);

  List<Employee> findByDelFlg(Boolean delFlg);

  @Query(value = "SELECT * FROM employee WHERE department_id = :departmentId AND del_flg = 0", nativeQuery = true)
  List<Employee> getEmployeeByDepartment(@Param("departmentId") Long departmentId);

  @Query(value = "SELECT e FROM Employee e WHERE  e.id IN :ids")
  List<Employee> findByIdIn(@Param("ids") List<Long> ids);

//   @Query(value = "SELECT NEW com.vdc.hrservice.hr.dto.employee.EmployeeDto(E.id, E.fullName, E.avatarPic) FROM Employee E WHERE E.id = :id AND E.delFlg=false")
//   Optional<EmployeeDto> getEmployeeById(@Param("id") Long id);
  // @Query(value = "SELECT NEW
  // com.vdc.hrservice.hr.dto.employee.EmployeeDto(E.id, E.fullName, E.avatarPic)
  // FROM Employee E WHERE E.id = :id AND E.delFlg=false")
  // Optional<EmployeeDto> getEmployeeById(@Param("id") Long id);
}
