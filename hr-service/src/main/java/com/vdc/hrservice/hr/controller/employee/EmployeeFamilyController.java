package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.domain.employee.EmployeeFamily;
import com.vdc.hrservice.hr.dto.employee.EmployeeFamilyDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeFamilyService;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/employee/family")
public class EmployeeFamilyController {
  @Autowired
  private EmployeeFamilyService employeeFamilyService;
  
  // list Employee Family
	@GetMapping("")
  public ResponseEntity<?> getEmployeeFamilyMembers() {
    return new ResponseEntity<>(employeeFamilyService.getEmployyFamilyMembers(), HttpStatus.OK);
  }
  
  //list Family find by EmployeeId
  @GetMapping("/{id}")
  public ResponseEntity<?> getFamilyMemberssByEmployeeId(@PathVariable Long id) {
    return new ResponseEntity<>(employeeFamilyService.getEmployyFamilyMembersById(id), HttpStatus.OK);
  }
  
  // create Employee Family
	@PostMapping("")
	public ResponseEntity<Object> createEmployeeFamily(@RequestBody EmployeeFamilyDto member) {
		try {
			EmployeeFamilyDto familymember = employeeFamilyService.createEmployeeFamilyMember(member);
			return new ResponseEntity<>(familymember, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// Update Employee Family
	@PutMapping("")
	public ResponseEntity<?> updateEmployeeFamily(@RequestBody EmployeeFamilyDto member) {
		try {
			EmployeeFamilyDto familymember = employeeFamilyService.updateEmployeeFamilyMember(member);
			return new ResponseEntity<>(familymember, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//delete Employee Family
	@DeleteMapping("/{memberId}")
	public ResponseEntity<?> deleteEmployeeFamily(@PathVariable Long memberId) {
		try {
			return new ResponseEntity<>(employeeFamilyService.deleteEmployeeFamilyMember(memberId), HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getCause().getCause().getMessage() ,HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
