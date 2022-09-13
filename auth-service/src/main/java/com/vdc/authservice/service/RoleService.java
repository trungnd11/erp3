package com.vdc.authservice.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.authservice.domain.Privilege;
import com.vdc.authservice.domain.Role;
import com.vdc.authservice.dto.RoleDto;
import com.vdc.authservice.repository.PrivilegeRepository;
import com.vdc.authservice.repository.RoleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public RoleDto saveRole(RoleDto roleDto) {
        Role role = Role.of(roleDto);
        role = roleRepository.save(role);
        return RoleDto.of(role);
    }

    public List<RoleDto> findRoleByKey(String key) {
        List<Role> roles = new ArrayList<>();
        if (StringUtils.hasText(key)) {
            roles = roleRepository.findByNameContainingIgnoreCase(key);
        } else {
            roles = roleRepository.findAll();
        }
        return roles.stream().map(RoleDto::of).collect(Collectors.toList());
    }

    public Optional<RoleDto> getRoleById(Long id) {
        Optional<Role> role = roleRepository.findById(id);
        return role.map(RoleDto::of);
    }
    
    @Transactional(rollbackFor = Exception.class)
    public RoleDto updateRole(Long roleId, RoleDto roleDto) {
        Role role = Role.of(roleDto);
        role = roleRepository.save(role);
        return RoleDto.of(role);
    }

}
