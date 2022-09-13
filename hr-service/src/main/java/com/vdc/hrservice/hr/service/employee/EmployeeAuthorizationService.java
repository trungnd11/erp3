package com.vdc.hrservice.hr.service.employee;

import java.util.List;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.EmployeeAuthorization;
import com.vdc.hrservice.hr.domain.target.Target;
import com.vdc.hrservice.hr.dto.employee.EmployeeAuthorizationDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeAuthorizationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeAuthorizationService {
    @Autowired
    private EmployeeAuthorizationRepository employeeAuthorizationRepo;

    public EmployeeAuthorization createMainEmployeeAuthorization(Target entity){
        EmployeeAuthorization emplAuth = new EmployeeAuthorization();
		emplAuth.setEmployeeMainId(entity.getEmployee().getId());
		emplAuth.setRoleRead(Boolean.TRUE);
		emplAuth.setRoleDiscussion(Boolean.TRUE);
		emplAuth.setRoleLimitedSubTarget(Boolean.TRUE);
		emplAuth.setRoleNotification(Boolean.TRUE);
		emplAuth.setRoleReport(Boolean.TRUE);	
		emplAuth.setRoleWriteJob(Boolean.TRUE);
		emplAuth.setRoleWriteTarget(Boolean.TRUE);
		emplAuth.setTargetId(entity.getId());
        emplAuth.setDelFlg(Constants.ALIVE);
		return emplAuth;
    }

    public EmployeeAuthorization createEmployeeAuthorization(EmployeeAuthorizationDto empl, Target entity){
        EmployeeAuthorization newEmpl = new EmployeeAuthorization();
			newEmpl.setEmployeeId(empl.getEmployeeId());
			newEmpl.setTargetId(entity.getId());
			newEmpl.setRoleDiscussion(empl.getRoleDiscussion());
			newEmpl.setRoleLimitedSubTarget(empl.getRoleLimitedSubTarget());
			newEmpl.setRoleNotification(empl.getRoleNotification());
			newEmpl.setRoleRead(empl.getRoleRead());
			newEmpl.setRoleReport(empl.getRoleReport());
			newEmpl.setRoleWriteJob(empl.getRoleWriteJob());
			newEmpl.setRoleWriteTarget(empl.getRoleWriteTarget());
		
		return newEmpl;	
    }

    public EmployeeAuthorization cloneEmployeeAuthorization(EmployeeAuthorization emplAuth, Target entity){
        EmployeeAuthorization newEmpl = new EmployeeAuthorization();

			newEmpl.setRoleDiscussion(emplAuth.getRoleDiscussion());
			newEmpl.setRoleLimitedSubTarget(emplAuth.getRoleLimitedSubTarget());
			newEmpl.setRoleNotification(emplAuth.getRoleNotification());
			newEmpl.setRoleRead(emplAuth.getRoleRead());
			newEmpl.setRoleWriteJob(emplAuth.getRoleWriteJob());
			newEmpl.setRoleWriteTarget(emplAuth.getRoleWriteTarget());
			newEmpl.setRoleReport(emplAuth.getRoleReport());
			newEmpl.setEmployeeId(emplAuth.getEmployeeId());
			newEmpl.setTargetId(entity.getId());
			newEmpl.setDelFlg(Constants.ALIVE);
			return newEmpl;
    }

    public List<EmployeeAuthorization> findEmployeeAuthorizationByTargetIdAndDelflg(Long targetId , Boolean delFlg){
		return employeeAuthorizationRepo.findByTargetIdAndDelFlg(targetId, delFlg);
	}
}
