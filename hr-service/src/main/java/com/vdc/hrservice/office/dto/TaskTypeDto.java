package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.TaskType;

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
public class TaskTypeDto {
    private Long id;
    private String name;

    public static TaskTypeDto of(TaskType entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        TaskTypeDto taskTypeDto = mapper.map(entity, TaskTypeDto.class);
        return taskTypeDto;

    }
}
