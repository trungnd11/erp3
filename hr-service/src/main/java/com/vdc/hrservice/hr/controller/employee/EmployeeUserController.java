package com.vdc.hrservice.hr.controller.employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vdc.hrservice.hr.dto.employee.EmployeeUserDto;
import com.vdc.hrservice.hr.service.employee.EmployeeUserService;

@RestController
@RequestMapping(path = "/api/v1/user")
public class EmployeeUserController {
    
    @Autowired
    private EmployeeUserService employeeUserService;


    @GetMapping(path = "/active")
    public ResponseEntity<?> getUserActive(@RequestParam(name="key") String key, Pageable pageable){
        try {
            Page<EmployeeUserDto> page = employeeUserService.getEmployeeActive(key, pageable); 
            return ResponseEntity.ok().body(page);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        } 
    }

    @GetMapping(path="/not-active")
    public ResponseEntity<?> getUserNotActive(@RequestParam(name="key") String key, Pageable pageable){
        try {
            Page<EmployeeUserDto> page = employeeUserService.getEmployeeNotActive(key, pageable);
            return ResponseEntity.ok().body(page);
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path="/blocked")
    public ResponseEntity<?> getUserBlocked(@RequestParam(name="key") String key, Pageable pageable){
        try {
            Page<EmployeeUserDto> page = employeeUserService.getEmployeeBlocked(key, pageable);
            return ResponseEntity.ok().body(page);
        } catch (Exception e) {
           e.printStackTrace();
           return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(path="/{id}")
    public ResponseEntity<?> getUserDetail(@PathVariable(name = "id") Long id){
        try {
            return ResponseEntity.ok().body("arg0");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
