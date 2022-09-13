package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.Label;

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
public class LabelDto {
    private Long id;
    private String name;
    private String color;

    public static LabelDto of(Label entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        LabelDto labelDto = mapper.map(entity, LabelDto.class);
        return labelDto;
    }
}
