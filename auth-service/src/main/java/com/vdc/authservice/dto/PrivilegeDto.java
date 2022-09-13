package com.vdc.authservice.dto;

import com.vdc.authservice.domain.Privilege;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PrivilegeDto {
    private Long id;
    private String name;
    private String description;

    public static PrivilegeDto of(Privilege privilege) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(privilege, PrivilegeDto.class);
    }
}
