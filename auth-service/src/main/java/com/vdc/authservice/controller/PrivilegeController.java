package com.vdc.authservice.controller;

import java.util.List;
import java.util.Optional;

import com.vdc.authservice.dto.PrivilegeDto;
import com.vdc.authservice.dto.Response;
import com.vdc.authservice.service.PrivilegeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path = "/api/v1/privilege")
public class PrivilegeController {

    @Autowired
    private PrivilegeService privilegeService;

    @GetMapping(path = "")
    public ResponseEntity<?> getAllPrivilege(@RequestParam(name = "key", required = false) String key) {
        try {
            List<PrivilegeDto> privilegeDtos = privilegeService.getAllPrivilege(key);
            return ResponseEntity.ok().body(new Response<List<PrivilegeDto>>(privilegeDtos));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getPrivilegeById(@PathVariable(name = "id") Long id) {
        try {
            Optional<PrivilegeDto> privilege = privilegeService.getPrivilegeById(id);
            if (privilege.isPresent()) {
                return ResponseEntity.ok().body(new Response<PrivilegeDto>(privilege.get()));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>("Privilege is not found!")); 
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PostMapping(path = "")
    public ResponseEntity<?> createPrivilege(@RequestBody PrivilegeDto privilegeDto) {
        try {
            PrivilegeDto rsDto = privilegeService.savePrivilege(privilegeDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response<PrivilegeDto>(rsDto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }
    
}
