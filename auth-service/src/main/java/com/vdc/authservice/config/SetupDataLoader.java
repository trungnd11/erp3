package com.vdc.authservice.config;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import com.vdc.authservice.domain.Privilege;
import com.vdc.authservice.domain.Role;
import com.vdc.authservice.domain.User;
import com.vdc.authservice.repository.PrivilegeRepository;
import com.vdc.authservice.repository.RoleRepository;
import com.vdc.authservice.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// @Component
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent>{

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepository;
 
    @Autowired
    private RoleRepository roleRepository;
 
    @Autowired
    private PrivilegeRepository privilegeRepository;
 
    @Autowired
    private PasswordEncoder passwordEncoder;
 
    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
 
        if (alreadySetup)
            return;
        Privilege readPrivilege
          = createPrivilegeIfNotFound("ROLE_READ_PRIVILEGE");
        Privilege writePrivilege
          = createPrivilegeIfNotFound("ROLE_WRITE_PRIVILEGE");
 
        List<Privilege> adminPrivileges = Arrays.asList(
          readPrivilege, writePrivilege);
        createRoleIfNotFound("ROLE_ADMIN", adminPrivileges, "ADMIN.ORG");
        createRoleIfNotFound("ROLE_USER", Arrays.asList(readPrivilege), "EMPLOYEE");

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");
        User user = new User();
        user.setUsername("trungnt");
        user.setPassword(passwordEncoder.encode("123"));
        user.setRoles(Arrays.asList(adminRole));
        user.setActive(true);
        userRepository.save(user);

        alreadySetup = true;
    }

    @Transactional
    Privilege createPrivilegeIfNotFound(String name) {
 
        Privilege privilege = privilegeRepository.findByName(name);
        if (privilege == null) {
            privilege = new Privilege(name);
            privilegeRepository.save(privilege);
        }
        return privilege;
    }

    @Transactional
    Role createRoleIfNotFound(
      String name, Collection<Privilege> privileges, String code) {
 
        Role role = roleRepository.findByName(name);
        if (role == null) {
            role = new Role(name);
            role.setCode(code);
            role.setPrivileges(privileges);
            roleRepository.save(role);
        }
        return role;
    }
    
}
