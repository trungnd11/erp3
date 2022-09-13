package com.vdc.hrservice.hr.org_team.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.apache.commons.lang3.builder.ToStringExclude;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.department.Department;
import com.vdc.hrservice.hr.org_team.dto.TeamDto;

import lombok.Data;
import lombok.ToString;

@Entity
@Table(name="team_team")
@Data
public class Team extends AbstractAuditingEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "code", nullable = false)
    private String code;
    
    @Column(name = "color")
    private String color;

    @Column(name = "descriptions")
    private String descriptions;

    @Column(name = "parentId")
    private String parentId;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "team")
    @Fetch(FetchMode.SUBSELECT)
    @ToString.Exclude
    private List<TeamMember> members;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deparment_id", referencedColumnName = "id")
    @ToString.Exclude
    private Department department;

    public static Team of(TeamDto teamDto){

        ModelMapper mapper = new ModelMapper();
        return mapper.map(teamDto, Team.class);
    }
}
