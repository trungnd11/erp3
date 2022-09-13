package com.vdc.hrservice.hr.org_team.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.hr.org_team.domain.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>{
    
    Optional<Team> findByIdAndDelFlgIsFalse(Long id);

    List<Team> findByDepartmentIdAndDelFlgIsFalse(Long departmentId);
}
