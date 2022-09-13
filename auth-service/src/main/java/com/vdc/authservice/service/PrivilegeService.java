package com.vdc.authservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.authservice.domain.Privilege;
import com.vdc.authservice.dto.PrivilegeDto;
import com.vdc.authservice.repository.PrivilegeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class PrivilegeService {

    @Autowired
    private PrivilegeRepository privilegeRepository;

    public List<PrivilegeDto> getAllPrivilege(String key) {
        List<Privilege> privileges = new ArrayList<>();
        if (StringUtils.hasText(key)){
            privileges = privilegeRepository.findByNameContainingIgnoreCase(key);
        }
        else {
            privileges = privilegeRepository.findAll();
        }
        return privileges.stream().map(PrivilegeDto::of).collect(Collectors.toList());
    }

    public PrivilegeDto savePrivilege(PrivilegeDto privilegeDto) {
        Privilege privilege = Privilege.of(privilegeDto);
        privilege = privilegeRepository.save(privilege);
        return PrivilegeDto.of(privilege);
    }

    public Optional<PrivilegeDto> getPrivilegeById(Long id) {
        Optional<Privilege> privilege = privilegeRepository.findById(id);
        return privilege.map(PrivilegeDto::of);
    }
}
