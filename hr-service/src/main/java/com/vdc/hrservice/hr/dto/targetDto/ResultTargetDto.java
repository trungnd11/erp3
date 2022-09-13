package com.vdc.hrservice.hr.dto.targetDto;

import com.vdc.hrservice.hr.domain.target.ResultTarget;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResultTargetDto {
    private Double result;
    private String monthYear;
    private Long departmentId;
    private Long employeeId;
    private TargetDto targetDto;

    public static ResultTargetDto of(ResultTarget resultTarget){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(resultTarget, ResultTargetDto.class);
    }
}
