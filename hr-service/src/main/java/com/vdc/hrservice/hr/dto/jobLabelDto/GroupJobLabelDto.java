package com.vdc.hrservice.hr.dto.jobLabelDto;

import java.util.List;

import com.vdc.hrservice.hr.domain.jobLabel.GroupJobLabel;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupJobLabelDto {
    private Long id;
    private String groupName;
    private Boolean groupLabelLibrary;
    private List<JobLabelDto> lstJobLabel;

    public static GroupJobLabelDto of(GroupJobLabel groupJobLabel){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(groupJobLabel, GroupJobLabelDto.class);
    }
}
