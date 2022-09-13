package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.Priority;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriorityDto {
    private Long id;
    private String name;
    private String color;

    public static PriorityDto of(Priority entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        PriorityDto priorityDto = mapper.map(entity, PriorityDto.class);
        return priorityDto;

    }
}
