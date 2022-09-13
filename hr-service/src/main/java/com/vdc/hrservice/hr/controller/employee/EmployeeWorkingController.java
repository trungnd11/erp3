package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.dto.employee.EmployeeWorkingDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeWorkingService;

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
@RequestMapping("api/v1/employee/working")
public class EmployeeWorkingController {
  
  @Autowired
  EmployeeWorkingService workingService;

  @GetMapping("")
  public ResponseEntity<?> getListWork() {
    try {
      return new ResponseEntity<>(workingService.getListWorking(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getListWorkById(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(workingService.getListWorkingById(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createWorking(@RequestBody EmployeeWorkingDto workingDto) {
    try {
      return new ResponseEntity<>(workingService.createWorking(workingDto), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateWorking(@RequestBody EmployeeWorkingDto workingDto) {
    try {
      return new ResponseEntity<>(workingService.updateWorking(workingDto), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteWorking(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(workingService.deleteWorking(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
