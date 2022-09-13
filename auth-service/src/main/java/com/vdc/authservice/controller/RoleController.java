package com.vdc.authservice.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.vdc.authservice.dto.Response;
import com.vdc.authservice.dto.RoleDto;
import com.vdc.authservice.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/role")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping(path = "")
    public ResponseEntity<?> getAllPrivilege(@RequestParam(name = "key", required = false) String key) {
        try {
            List<RoleDto> roleDtos = roleService.findRoleByKey(key);
            // System.out.println(roleDtos);
            return ResponseEntity.ok().body(new Response<List<RoleDto>>(roleDtos));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getPrivilegeById(@PathVariable(name = "id") Long id) {
        try {
            Optional<RoleDto> roleDto = roleService.getRoleById(id);
            if (roleDto.isPresent()) {
                return ResponseEntity.ok().body(new Response<RoleDto>(roleDto.get()));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response<>("Role is not found!"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PostMapping(path = "")
    public ResponseEntity<?> createPrivilege(@RequestBody RoleDto roleDto) {
        try {
            RoleDto rsDto = roleService.saveRole(roleDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response<RoleDto>(rsDto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }
    
    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateRole(@PathVariable(name = "id") Long id,
            @RequestBody RoleDto roleDto) {
        try {
            RoleDto dto = roleService.updateRole(id, roleDto);
            return ResponseEntity.ok().body(new Response<RoleDto>(dto));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }
}
