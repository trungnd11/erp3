package com.vdc.hrservice.auth.dto;

import java.util.Collection;

import com.vdc.hrservice.auth.domain.AppRole;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppRoleDto {
    
    private Long id;
    private String name;
    private String code;
    private Collection<PrivilegeDto> privileges;

    public static AppRoleDto of(AppRole appRole){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(appRole, AppRoleDto.class);
    }
}
