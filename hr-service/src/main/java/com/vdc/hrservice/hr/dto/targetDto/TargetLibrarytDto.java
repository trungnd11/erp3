package com.vdc.hrservice.hr.dto.targetDto;

import java.util.ArrayList;
import java.util.List;

import com.vdc.hrservice.hr.domain.target.TargetLibrary;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TargetLibrarytDto {
    private Long id;
    private String libraryTargetName;
    private List<TargetDto> listTarget;

    public static TargetLibrarytDto of(TargetLibrary targetLibrary){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(targetLibrary, TargetLibrarytDto.class);
    }
}
