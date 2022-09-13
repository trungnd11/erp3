package com.vdc.hrservice.hr.repository.employee;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.dto.employee.EmployeeUserDto;

@Repository
public interface EmployeeUserRepository extends JpaRepository<Employee, Long>{
    @Query(value = "SELECT new com.vdc.hrservice.hr.dto.employee.EmployeeUserDto(e.id, u.username, e.employeeNumb, e.fullName, d.name, e.createdDate, u.activedAt) FROM Employee e LEFT JOIN e.user u"+
    " LEFT JOIN e.empDepartment d"+
    " WHERE u.active=1 AND e.delFlg=0 AND UPPER(e.fullName) LIKE UPPER(CONCAT('%',:key,'%'))", 
    countQuery = "SELECT count(e) FROM Employee e LEFT JOIN e.user u"+
    " LEFT JOIN e.empDepartment d"+
    " WHERE u.active=1 AND e.delFlg=0 AND UPPER(e.fullName) LIKE UPPER(CONCAT('%',:key,'%'))" )
    Page<EmployeeUserDto> getEmployeeActive(String key, Pageable pageable);

    @Query(value = "SELECT new com.vdc.hrservice.hr.dto.employee.EmployeeUserDto(e.id, u.username, e.employeeNumb, e.fullName, d.name, e.createdDate, u.activedAt) FROM Employee e LEFT JOIN e.user u"+
    " LEFT JOIN e.empDepartment d"+
    " WHERE e.delFlg=1 AND UPPER(e.fullName) LIKE UPPER(CONCAT('%',:key,'%'))", 
    countQuery = "SELECT count(e) FROM Employee e LEFT JOIN e.user u"+
    " LEFT JOIN e.empDepartment d"+
    " WHERE e.delFlg=1 AND UPPER(e.fullName) LIKE UPPER(CONCAT('%',:key,'%'))" )
    Page<EmployeeUserDto> getEmployeeBlocked(String key, Pageable pageable);

    @Query(value = "SELECT new com.vdc.hrservice.hr.dto.employee.EmployeeUserDto(e.id, u.username, e.employeeNumb, e.fullName, d.name, e.createdDate, u.activedAt) FROM Employee e LEFT JOIN e.user u"+
    " LEFT JOIN e.empDepartment d"+
    " WHERE u.active=0 AND e.delFlg=0 AND UPPER(e.fullName) LIKE UPPER(CONCAT('%',:key,'%'))", 
    countQuery = "SELECT count(e) FROM Employee e LEFT JOIN e.user u"+
    " LEFT JOIN e.empDepartment d"+
    " WHERE u.active=0 AND e.delFlg=0 AND UPPER(e.fullName) LIKE UPPER(CONCAT('%',:key,'%'))" )
    Page<EmployeeUserDto> getEmployeeNotActive(String key, Pageable pageable);
}
