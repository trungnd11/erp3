package com.vdc.hrservice.office.dto;

import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Status;

import java.util.List;

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
public class StatusDto {
    private Long id;
    private String name;
    private Integer step;
    private String color;
    private Long projectId;
    private List<TaskDto> lstTask;
    private Boolean delFlg;

    public void setConvertProjectId(Long projectId){
         this.projectId = projectId;
    }

    public static StatusDto of(Status entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        StatusDto statusDto = mapper.map(entity, StatusDto.class);
        if(entity.getProject().getId() != null){
            statusDto.setConvertProjectId(entity.getProject().getId());
        }      
        return statusDto;                         

    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BasicStatusDto{
        private Long id;
        private String name;
        private Integer step;
        private String color;
        private Long projectId;
        private Boolean delFlg;
        public void setConvertProjectId(Long projectId){
            this.projectId = projectId;
       }
        public static BasicStatusDto of(Status entity){
            ModelMapper mapper = new ModelMapper();
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                     .setSkipNullEnabled(true);
            BasicStatusDto statusDto = mapper.map(entity, BasicStatusDto.class);   
            if(entity.getProject().getId() != null){
                statusDto.setConvertProjectId(entity.getProject().getId());
            }   
            return statusDto;                         
    
        }
    }
}
