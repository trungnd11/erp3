package com.vdc.hrservice.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.auth.domain.AppRole;

@Repository
public interface RoleRepository extends JpaRepository<AppRole, Long> {
    
    @Query("SELECT r FROM AppRole r LEFT JOIN FETCH r.privileges WHERE r.code = :code")
    AppRole findByCode(String code);

    List<AppRole> findByIdIn(List<Long> ids);
}
