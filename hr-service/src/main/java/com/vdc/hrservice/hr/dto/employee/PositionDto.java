package com.vdc.hrservice.hr.dto.employee;

import java.util.Collection;

import com.vdc.hrservice.auth.dto.AppRoleDto;
import com.vdc.hrservice.hr.domain.employee.Position;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PositionDto {
    private Long id;
    private String name;
    private String descriptions;
    private Collection<AppRoleDto> roles;

    public static PositionDto of(Position position){
        ModelMapper mapper = new ModelMapper();
        PositionDto dto = mapper.map(position, PositionDto.class);
        return dto;
    }
}
