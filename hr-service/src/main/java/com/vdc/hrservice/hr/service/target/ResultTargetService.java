package com.vdc.hrservice.hr.service.target;

import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.target.ResultTarget;
import com.vdc.hrservice.hr.domain.target.Target;
import com.vdc.hrservice.hr.dto.targetDto.ResultTargetDto;
import com.vdc.hrservice.hr.repository.target.ResultTargetRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResultTargetService {
    @Autowired
    private ResultTargetRepository resultTargetRepository;

    public ResultTarget createResultTarget(Target target){
        ResultTarget resultTarget = new ResultTarget();
	  if (target.getDepartment() != null) {
		   resultTarget.setDepartmentId(target.getDepartment().getId());
	   } else {
		   resultTarget.setEmployeeId(target.getEmployee().getId());
	   }
	   
	   resultTarget.setMonthYear(DateUtils.getStrCurrentMonthYear());
	   resultTarget.setResult(target.getProgress());
	   resultTarget.setTarget(target);
	   resultTarget.setDelFlg(Constants.DELFLG_ZERO);
	   return resultTarget;
    }

	public List<ResultTargetDto> findListTargetResultByDepartmentIdAndMonthYear(Long departmentId,String monthYear, Boolean delFlg){
		List<ResultTarget> lstResultTarget = resultTargetRepository.findByDepartmentIdAndMonthYearAndDelFlg(departmentId,monthYear, delFlg);
		List<ResultTargetDto> lstDto = lstResultTarget.stream().map(ResultTargetDto::of).collect(Collectors.toList());
		return lstDto;
 	}
}
