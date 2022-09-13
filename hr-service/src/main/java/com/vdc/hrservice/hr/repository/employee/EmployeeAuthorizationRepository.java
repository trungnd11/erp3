package com.vdc.hrservice.hr.repository.employee;

import java.util.List;

import com.vdc.hrservice.hr.domain.employee.EmployeeAuthorization;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeAuthorizationRepository extends JpaRepository<EmployeeAuthorization, Long> {
    List<EmployeeAuthorization> findByTargetIdAndDelFlg(Long targetId , Boolean delFlg);
}
