package com.vdc.authservice.repository;

import java.util.List;

import com.vdc.authservice.domain.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);

    List<Role> findByNameContainingIgnoreCase(String name);
    
    List<Role> findByIdIn(List<Long> ids);
}
