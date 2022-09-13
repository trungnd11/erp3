package com.vdc.hrservice.hr.repository.target;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.hr.domain.target.Target;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TargetRepository extends JpaRepository<Target, Long> {
	
	List<Target> findByDepartmentIdAndYearAndDelFlg(Long deparmentId , String year, Boolean delFlg);
	
    Optional<Target> findByIdAndDelFlg(Long id, Boolean delFlg);

    List<Target> findByParrentAndYearAndDelFlg(Long parrent ,String year, Boolean delFlg);

    List<Target> findByDepartmentIdAndParrentAndYearAndDelFlgOrderByFinishDayAsc(Long departmentId,Long parrent,String year, Boolean delFlg);

    List<Target> findByEmployeeIdAndYearAndDelFlg(Long employeeId, String year, Boolean delFlg);

    List<Target> findByEmployeeIdAndParrentAndYearAndDelFlg(Long employeeId,Long parrent, String year, Boolean delFlg);
}
