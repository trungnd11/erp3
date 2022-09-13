package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.dto.employee.EmployeeForeignLanguageDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeLanguageService;

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
@RequestMapping("api/v1/employee/language")
public class EmployeeLanguageController {

  @Autowired
  EmployeeLanguageService languageService;

  @GetMapping("")
  public ResponseEntity<?> getLanguages() {
    try {
      return new ResponseEntity<>(languageService.getForeignLanguages(), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> getLanguagesByEmployeeId(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(languageService.getForeignLanguagesById(id), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createLanguage(@RequestBody EmployeeForeignLanguageDto languageDto) {
    try {
      return new ResponseEntity<>(languageService.createForeignLanguage(languageDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateLanguage(@RequestBody EmployeeForeignLanguageDto languageDto) {
    try {
      return new ResponseEntity<>(languageService.updateForeignLanguage(languageDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteLanguage(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(languageService.deleteForeignLanguage(id), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
