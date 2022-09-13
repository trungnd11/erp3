package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.domain.employee.EmployeeProjectExperience;
import com.vdc.hrservice.hr.dto.employee.EmployeeProjectExperienceDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeProjectService;

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
@RequestMapping("api/v1/employee/project")
public class EmployeeProjectController {
  
  @Autowired
  EmployeeProjectService projectService;

  @GetMapping("")
  public ResponseEntity<?> listProjetcs() {
    try {
      return new ResponseEntity<>(projectService.getEmployeeProjetcs(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> listProjetcsById(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(projectService.getEmployeeProjetcsById(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createEmployeeProject(@RequestBody EmployeeProjectExperienceDto projectDto) {
    try {
      return new ResponseEntity<>(projectService.createEmployeeProjetc(projectDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateEmployeeProject(@RequestBody EmployeeProjectExperienceDto projectDto) {
    try {
      return new ResponseEntity<>(projectService.updateEmployeeProjetc(projectDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteEmployeeProject(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(projectService.deleteEmployeeProjetcs(id), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
