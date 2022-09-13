package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.dto.employee.EmployeeTrainingDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeTrainingService;

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
@RequestMapping("api/v1/employee/training")
public class EmployeeTrainingController {
  
  @Autowired
  EmployeeTrainingService trainingService;

  @GetMapping("")
  public ResponseEntity<?> getEmployeesTraining() {
    try {
      return new ResponseEntity<>(trainingService.getEmployeesTraining(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getEmployeesTrainingById(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(trainingService.getEmployeesTrainingById(id), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createEmployeeTraining(@RequestBody EmployeeTrainingDto trainingDto) {
    try {
      return new ResponseEntity<>(trainingService.createEmployeeTraining(trainingDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateEmployeeTraining(@RequestBody EmployeeTrainingDto trainingDto) {
    try {
      return new ResponseEntity<>(trainingService.updateEmployeeTraining(trainingDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteEmployeeTraining(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(trainingService.deleteEmployeesTraining(id), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
