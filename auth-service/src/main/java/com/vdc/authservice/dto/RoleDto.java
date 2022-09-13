package com.vdc.authservice.dto;

import java.util.Collection;
import java.util.Set;

import com.vdc.authservice.domain.Role;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoleDto {
    private Long id;

    private String name;

    private String code;

    private Collection<PrivilegeDto> privileges;

    public static RoleDto of(Role role) {
        ModelMapper mapper = new ModelMapper();
        RoleDto dto = mapper.map(role, RoleDto.class);
        return dto;
    }

    public RoleDto(Long id, String name, String code){
        this.id=id;
        this.name=name;
        this.code = code;
    }
}
