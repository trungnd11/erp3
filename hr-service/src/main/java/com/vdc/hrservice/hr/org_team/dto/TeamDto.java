package com.vdc.hrservice.hr.org_team.dto;

import java.util.List;

import org.modelmapper.ModelMapper;

import com.vdc.hrservice.hr.org_team.domain.Team;

import lombok.Data;

@Data
public class TeamDto {

    private Long id;

    private String name;

    private String code;

    private String color;

    private String descriptions;

    private String parentId;
    
    private List<TeamMemberDto> members;

    private Long departmentId;

    public static TeamDto of(Team team){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(team, TeamDto.class);
    }

    @Data
    public static class TeamDtoS{
        private Long id;

        private String name;

        private String code;

        private String color;

        private String descriptions;

        private String parentId;

        private Long departmentId;
        
        private List<TeamMemberDto> members;

        private TeamMemberDto teamLead;

        public static TeamDtoS of(Team team){
            ModelMapper mapper = new ModelMapper();
            return mapper.map(team, TeamDtoS.class);
        }

    }
}
