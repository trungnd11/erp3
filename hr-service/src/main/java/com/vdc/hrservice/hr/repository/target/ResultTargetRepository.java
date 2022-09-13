package com.vdc.hrservice.hr.repository.target;

import java.util.List;

import com.vdc.hrservice.hr.domain.target.ResultTarget;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultTargetRepository extends JpaRepository<ResultTarget, Long> {
    List<ResultTarget> findByDepartmentIdAndMonthYearAndDelFlg(Long departmentId,String monthYear, Boolean delFlg);
}
