package com.vdc.hrservice.hr.org_team.dto;

import org.modelmapper.ModelMapper;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.org_team.domain.TeamMember;
import com.vdc.hrservice.hr.org_team.enumtype.RoleType;

import lombok.Data;

@Data
public class TeamMemberDto {
    
    private Long id;

    private Long employeeId;

    @JsonProperty("fullname")
    private String employeeFullName;

    @JsonProperty("avatar")
    private String employeeAvatarPic;

    private RoleType role;

    public static TeamMemberDto of(TeamMember teamMember){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(teamMember, TeamMemberDto.class);
    }

    
    @Override
    public boolean equals(Object o){
        if (o == this) {
            return true;
        }
 
        /* Check if o is an instance of Complex or not
          "null instanceof [type]" also returns false */
        if (!(o instanceof TeamMemberDto)) {
            return false;
        }
         
        // typecast o to Complex so that we can compare data members
        TeamMemberDto c = (TeamMemberDto) o;
         
        // Compare the data members and return accordingly
        return Long.compare(this.employeeId, c.getEmployeeId()) == 0;
    }

}
