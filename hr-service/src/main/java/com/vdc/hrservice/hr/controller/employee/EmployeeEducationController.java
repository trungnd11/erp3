package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.dto.employee.EmployeeEducationDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeEducationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("api/v1/employee/education")
public class EmployeeEducationController {

  @Autowired
  private EmployeeEducationService educationService;

  // list educations
  @GetMapping("")
  public ResponseEntity<?> getListEducation() {
    return ResponseEntity.ok(educationService.getEmployeeEducations());
  }

  //list education by employeeId
  @GetMapping("/{id}")
  public ResponseEntity<?> getListEducationbyId(@PathVariable Long id) {
    return ResponseEntity.ok(educationService.getEmployeeEducationsById(id));
  }

  // create new education for employee
  @PostMapping("")
  public ResponseEntity<?> createEducation(@RequestBody EmployeeEducationDto educationDto) {
    try {
      return new ResponseEntity<>(educationService.createEmployeeEducation(educationDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  // edit education by employee Id
  @PutMapping("")
  public ResponseEntity<?> updateEducation(@RequestBody EmployeeEducationDto educationDto) {
    try {
      return new ResponseEntity<>(educationService.updateEmployeeEducation(educationDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // delete education
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(educationService.deleteEmployeeEducation(id), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
