package com.vdc.authservice.repository;

import java.util.List;

import com.vdc.authservice.domain.Privilege;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {
    
    Privilege findByName(String name);

    List<Privilege> findByNameContainingIgnoreCase(String name);

    List<Privilege> findByIdIn(List<Long> ids);
}
