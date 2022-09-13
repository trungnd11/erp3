package com.vdc.hrservice.hr.dto.jobLabelDto;

import com.vdc.hrservice.hr.domain.jobLabel.JobLabel;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobLabelDto {
    private Long id;
    private String labelName;
    private String colorCode;
    private Long groupJobLabelId;

    public static JobLabelDto of(JobLabel jobLabel){
        ModelMapper mapper = new ModelMapper();
        JobLabelDto dto =  mapper.map(jobLabel, JobLabelDto.class);
        dto.setGroupJobLabelId(jobLabel.getGroupJobLabel().getId());
        return dto;
    }
}
