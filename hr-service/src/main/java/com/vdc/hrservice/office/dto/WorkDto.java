package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.Work;

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
public class WorkDto {
    private Long id;
    private String name;
    private String workStatus;

    public static WorkDto of(Work entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        return mapper.map(entity, WorkDto.class);
    }
}
