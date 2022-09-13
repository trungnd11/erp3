package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.dto.employee.EmployeeSpecializeDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeSpecializeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/employee/specialize")
public class EmployeeSpecilizeController {

  @Autowired
  EmployeeSpecializeService specializeService;

  @GetMapping("")
  public ResponseEntity<?> getSpecializes() {
    try {
      return new ResponseEntity<>(specializeService.getSpecializes(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getSpecializes(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(specializeService.getSpecializesById(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createSpecialize(@RequestBody EmployeeSpecializeDto specializeDto) {
    try {
      return new ResponseEntity<>(specializeService.createSpecialize(specializeDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateSpecialize(@RequestBody EmployeeSpecializeDto specializeDto) {
    try {
      return new ResponseEntity<>(specializeService.updateSpecialize(specializeDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteSpecialize(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(specializeService.deleteSpecialize(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
