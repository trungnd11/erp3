package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.HashTag;

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
public class HashTagDto {
    private Long id;
    private String name;

    public static HashTagDto of(HashTag entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
        .setSkipNullEnabled(true);
        return mapper.map(entity, HashTagDto.class);
    }
}
