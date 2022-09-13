package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.Evaluation;

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
public class EvaluationDto {
    private Long id;
    private Integer percentComplete;
    private String quality;
    private String timeComplete;
    private TaskDto task;

    public static EvaluationDto of(Evaluation entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        EvaluationDto evaluationDto = mapper.map(entity, EvaluationDto.class);
        return evaluationDto;
    }
}
