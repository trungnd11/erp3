package com.vdc.hrservice.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.auth.domain.Privilege;

@Repository
public interface PrivilegeRepository extends JpaRepository<Privilege,Long>{
    
    @Query("SELECT p FROM Privilege p LEFT JOIN FETCH p.roles WHERE p.name = :name")
    Privilege findByName(String name);

    List<Privilege> findByIdIn(List<Long> ids);
}
