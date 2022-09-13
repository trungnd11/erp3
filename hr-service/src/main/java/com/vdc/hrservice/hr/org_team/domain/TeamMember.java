package com.vdc.hrservice.hr.org_team.domain;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.modelmapper.ModelMapper;

import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.org_team.dto.TeamMemberDto;
import com.vdc.hrservice.hr.org_team.enumtype.RoleType;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name = "team_member")
@Data
public class TeamMember {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", referencedColumnName = "id")
    @ToString.Exclude
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", referencedColumnName = "id")
    @ToString.Exclude
    private Team team;

    @Column(name="role", nullable = false)
    @NotNull
    @NotBlank
    @Enumerated(EnumType.STRING)
    private RoleType role;

    public static TeamMember of(TeamMemberDto memberDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(memberDto, TeamMember.class);
    }
}
