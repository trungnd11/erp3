package com.vdc.hrservice.hr.org_team.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.hr.org_team.domain.TeamMember;
import com.vdc.hrservice.hr.org_team.enumtype.RoleType;

@Repository
public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    
    Optional<TeamMember> findByEmployeeIdAndTeamId(Long id, Long teamId);

    Optional<TeamMember> findByRoleAndTeamId(RoleType role, Long teamId);
}
