package com.vdc.hrservice.hr.service.employee;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.employee.EmployeeFamily;
import com.vdc.hrservice.hr.dto.employee.EmployeeFamilyDto;
import com.vdc.hrservice.hr.repository.employee.EmployeeFamilyRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeFamilyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeFamilySeviceImpl implements EmployeeFamilyService {

	@Autowired
	private EmployeeFamilyRepository employeeFamilyRepo;
	
	@Autowired
	private EmployeeRepository employeeRepo;

	@Override
    public List<EmployeeFamilyDto> getEmployyFamilyMembers() {
      List<EmployeeFamily> listMember = employeeFamilyRepo.findByDelFlg(Constants.DELFLG_ONE);
      List<EmployeeFamilyDto> listMemberDto = listMember.stream().map(EmployeeFamilyDto::of)
          .collect(Collectors.toList());
      return listMemberDto;
    }
  
	@Override
  public List<EmployeeFamilyDto> getEmployyFamilyMembersById(Long id) {
      List<EmployeeFamily> listMember = employeeFamilyRepo.listFamilyByEmployeeId(id);
      List<EmployeeFamilyDto> listMemberDto = listMember.stream().map(EmployeeFamilyDto::of)
        .collect(Collectors.toList());
      return listMemberDto;
  }
  
  @Override
	public EmployeeFamilyDto createEmployeeFamilyMember(EmployeeFamilyDto newMember) {
		EmployeeFamily member = new EmployeeFamily();
		Employee employee = employeeRepo.getById(newMember.getEmployeeId());
		member.setEmployee(employee);
		member.setFullName(newMember.getFullName());
		member.setRelationship(newMember.getRelationship());
		member.setPhone(newMember.getPhone());
		member.setAddress(newMember.getAddress());
		member.setJob(newMember.getJob());
    member.setBirthday(newMember.getBirthday());
    employeeFamilyRepo.save(member);
    // EmployeeFamilyDto memberDto = EmployeeFamilyDto.of(member);
		return newMember;
	}

	@Override
	public EmployeeFamilyDto updateEmployeeFamilyMember(EmployeeFamilyDto updateMember) {
		EmployeeFamily member = employeeFamilyRepo.findById(updateMember.getId()).get();
		member.setFullName(updateMember.getFullName());
		member.setRelationship(updateMember.getRelationship());
		member.setPhone(updateMember.getPhone());
		member.setAddress(updateMember.getAddress());
		member.setJob(updateMember.getJob());
    member.setBirthday(updateMember.getBirthday());
    employeeFamilyRepo.save(member);
		// EmployeeFamilyDto memberDto = EmployeeFamilyDto.of(member);
		return updateMember;
	}

	@Override
	public int deleteEmployeeFamilyMember(Long memberId) {
		EmployeeFamily member = employeeFamilyRepo.findById(memberId).get();
		member.setDelFlg(Constants.DELFLG_ONE);
		employeeFamilyRepo.save(member);
		return 1;
	}
	
}
