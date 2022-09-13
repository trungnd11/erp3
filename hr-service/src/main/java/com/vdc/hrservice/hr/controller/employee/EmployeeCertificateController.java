package com.vdc.hrservice.hr.controller.employee;

import com.vdc.hrservice.hr.dto.employee.EmployeeCertificateDto;
import com.vdc.hrservice.hr.service.employee.interfaceService.EmployeeCertificateService;

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
@RequestMapping("api/v1/employee/certificate")
public class EmployeeCertificateController {

  @Autowired
  private EmployeeCertificateService certificateService;

  @GetMapping("")
  public ResponseEntity<?> listCertificates() {
    try {
      return new ResponseEntity<>(certificateService.getCertificates(), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/{id}")
  public ResponseEntity<?> listCertificatesByEmployeeId(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(certificateService.getCertificatesByEmployeeId(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping("")
  public ResponseEntity<?> createEmployeeCertificate(@RequestBody EmployeeCertificateDto certificateDto) {
    try {
      return new ResponseEntity<>(certificateService.createCertificate(certificateDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("")
  public ResponseEntity<?> updateEmployeeCertificate(@RequestBody EmployeeCertificateDto certificateDto) {
    try {
      return new ResponseEntity<>(certificateService.updateCertificate(certificateDto), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteEmployeeCertificate(@PathVariable Long id) {
    try {
      return new ResponseEntity<>(certificateService.deleteCertificate(id), HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getCause().getCause().getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
