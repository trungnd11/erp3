package com.vdc.hrservice.office.dto;

import java.time.ZonedDateTime;
import java.util.List;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.office.domain.Sprint;
import com.vdc.hrservice.office.dto.TaskDto.BasicTaskDto;

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
public class SprintDto {
    private Long id;
    private String sprintName;
    private String startDay;
    private String finishDay;
    private String typeSprint;
    private Long projectId;
    private List<BasicTaskDto> tasks;
    private Boolean delFlg;

    public void setStartDayConvert(ZonedDateTime startDay){
        this.startDay = DateUtils.format(startDay, "yyyy-MM-dd");
     }
 
    public void setFinishdayConvert(ZonedDateTime finishDay){
        this.finishDay = DateUtils.format(finishDay, "yyyy-MM-dd");
    }

    public void setIdProject(Long projectId){
        this.projectId = projectId;
    }

    @Override
    public boolean equals(Object o){
        if (this == o) {
            return true;
        } 
        if(!(o instanceof SprintDto)){
            return false;
        }
        return id != null && id.equals(((SprintDto) o).id);
    }

    public static SprintDto of(Sprint entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        SprintDto dto =  mapper.map(entity, SprintDto.class);
        dto.setIdProject(entity.getProject().getId());
        dto.setFinishdayConvert(entity.getFinishDay());
        dto.setStartDayConvert(entity.getStartDay());
        return dto;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BasicSprintDto{
        private Long id;
        private String sprintName;
        private String startDay;
        private String finishDay;

        public void setStartDayConvert(ZonedDateTime startDay){
            this.startDay = DateUtils.format(startDay, "yyyy-MM-dd");
         }
     
        public void setFinishdayConvert(ZonedDateTime finishDay){
            this.finishDay = DateUtils.format(finishDay, "yyyy-MM-dd");
        }

        public static BasicSprintDto of(Sprint entity){
            ModelMapper mapper = new ModelMapper();
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
            BasicSprintDto dto = mapper.map(entity, BasicSprintDto.class);
            dto.setFinishdayConvert(entity.getFinishDay());
            dto.setStartDayConvert(entity.getStartDay());
            return dto;
        }
    }

    
}
