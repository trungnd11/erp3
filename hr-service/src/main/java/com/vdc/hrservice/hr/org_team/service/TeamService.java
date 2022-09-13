package com.vdc.hrservice.hr.org_team.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.org_team.domain.Team;
import com.vdc.hrservice.hr.org_team.domain.TeamMember;
import com.vdc.hrservice.hr.org_team.dto.TeamDto;
import com.vdc.hrservice.hr.org_team.dto.TeamMemberDto;
import com.vdc.hrservice.hr.org_team.dto.TeamDto.TeamDtoS;
import com.vdc.hrservice.hr.org_team.enumtype.RoleType;
import com.vdc.hrservice.hr.org_team.repository.TeamMemberRepository;
import com.vdc.hrservice.hr.org_team.repository.TeamRepository;
import com.vdc.hrservice.hr.repository.department.DepartmentRepository;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    public TeamDto saveTeam(Long departmentId, TeamDto teamDto) throws Exception {
        Department department = departmentRepository.findByIdAndDelFlgIsFalse(departmentId)
                .orElseThrow(() -> new Exception("Department is not existed!"));
        Team team = Team.of(teamDto);
        team.setDepartment(department);
        team.setParentId(teamDto.getParentId());
        team = teamRepository.save(team);
        return TeamDto.of(team);
    }

    public TeamDto updateTeam(Long teamId, TeamDto teamDto) throws Exception {
        Team team = teamRepository.findByIdAndDelFlgIsFalse(teamId)
                .orElseThrow(() -> new Exception("Team is not existed!"));
        team.setName(teamDto.getName());
        team.setColor(teamDto.getColor());
        team.setDescriptions(teamDto.getDescriptions());
        return null;
    }

    public List<TeamDtoS> getAllTeam(Long departmentId) {
        List<Team> teams = teamRepository.findByDepartmentIdAndDelFlgIsFalse(departmentId);
        List<TeamDtoS> teamDtoS = teams.stream().map((t) -> {
            TeamDtoS dto = TeamDtoS.of(t);
            List<TeamMember> member = t.getMembers();
            TeamMember lead = member.stream().filter(m -> m.getRole() == RoleType.TEAM_LEAD).findAny().orElse(null);
            if(lead!=null){
                dto.setTeamLead(TeamMemberDto.of(lead));
            }
            return dto;
        }).collect(Collectors.toList());
        return teamDtoS;
    }

    @Transactional(rollbackFor = Exception.class)
    public TeamDto updateTeamMember(Long teamId, List<TeamMemberDto> members) throws Exception {
        Team team = teamRepository.findByIdAndDelFlgIsFalse(teamId)
                .orElseThrow(() -> new Exception("Team is not existed!"));
        List<TeamMemberDto> unsavedMember = new ArrayList<>();
        List<TeamMemberDto> savedMember = new ArrayList<>();

        for (TeamMemberDto member : members) {
            if (member.getId() != null) {
                savedMember.add(member);
            } else {
                unsavedMember.add(member);
            }
        }

        List<TeamMember> unsave = unsavedMember.stream().map(m -> {
            TeamMember member = new TeamMember();
            Employee e = new Employee();
            e.setId(m.getEmployeeId());
            member.setEmployee(e);
            member.setRole(m.getRole());
            member.setTeam(team);
            return member;
        }).collect(Collectors.toList());

        unsave = teamMemberRepository.saveAll(unsave);

        List<TeamMember> saved = savedMember.stream().map(m -> {
            TeamMember member = new TeamMember();
            member.setId(m.getId());
            Employee e = new Employee();
            e.setId(m.getEmployeeId());
            member.setEmployee(e);
            member.setRole(m.getRole());
            member.setTeam(team);
            return member;
        }).collect(Collectors.toList());

        saved = teamMemberRepository.saveAll(saved);

        saved.addAll(unsave);

        team.setMembers(saved);
        Team updatedTeam = teamRepository.save(team);
        TeamDto dto = new TeamDto();
        dto = TeamDto.of(updatedTeam);
        return dto;
    }

    @Transactional(rollbackFor = Exception.class)
    public Boolean deleteTeam(Long id) throws Exception {
        try {
            Team team = teamRepository.findByIdAndDelFlgIsFalse(id)
                    .orElseThrow(() -> new Exception("Team is not existed!"));
            teamRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    @Transactional(rollbackFor = Exception.class)
    public TeamMemberDto setLeader(Long teamId, Long memberId) throws Exception{
        TeamMember leader = teamMemberRepository.findByRoleAndTeamId(RoleType.TEAM_LEAD, teamId).orElse(null);
        if(leader!=null){
            leader.setRole(RoleType.TEAM_MEMBER);
            teamMemberRepository.save(leader);
        }
        TeamMember member = teamMemberRepository.findByEmployeeIdAndTeamId(memberId, teamId).orElseThrow(() -> new Exception("Member is not existed!"));
        member.setRole(RoleType.TEAM_LEAD);
        member = teamMemberRepository.save(member);
        return TeamMemberDto.of(member);
    }
}