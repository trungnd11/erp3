package com.vdc.hrservice.hr.service.employee.interfaceService;

import java.util.List;
import com.vdc.hrservice.hr.dto.employee.EmployeeFamilyDto;

public interface EmployeeFamilyService {
  public abstract List<EmployeeFamilyDto> getEmployyFamilyMembers();
  public abstract List<EmployeeFamilyDto> getEmployyFamilyMembersById(Long id);
	public abstract EmployeeFamilyDto createEmployeeFamilyMember(EmployeeFamilyDto member);
	public abstract EmployeeFamilyDto updateEmployeeFamilyMember(EmployeeFamilyDto member);
	public abstract int deleteEmployeeFamilyMember(Long memberId);
}
