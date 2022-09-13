package com.vdc.hrservice.office.dto;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Set;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.BasicEmployeeDto;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.SprintDto.BasicSprintDto;
import com.vdc.hrservice.office.dto.StatusDto.BasicStatusDto;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskDto {
    private Long id;
    private String taskName;
    private String taskNo;
    private String startDay;
    private String finishDay;
    private String expectedStart;
    private String expectedEnding;
    private String description;
    private String typeDuration;
    private Long parrent;
    private Double progress;
    private Integer weight;
    private Integer calculationMethod;
    private BasicEmployeeDto reporter;
    private List<BasicEmployeeDto> lstAssignee;
    private List<BasicEmployeeDto> lstWatcher;
    private List<WorkDto> lstWorks;
    private List<AttachFileDto> files;
    private List<HashTagDto> tags;
    // private ProjectDto project;
    // private SprintDto sprint;
    // private PriorityDto priority;
    // private LabelDto label;
    // private TaskTypeDto taskType;
    // private StatusDto status;
    private Long statusId;
    private Long priorityId;
    private Long labelId;
    private Long sprintId;
    private Long taskTypeId;

    public TaskDto(Long id) {
        this.id = id;
    }

    public void setExpectedStartConvert(ZonedDateTime expectedStart){
       this.expectedStart = DateUtils.format(expectedStart, "dd/MM/yyyy HH:mm:ss");
    }   
    public void setExpectedEndingConvert(ZonedDateTime expectedEnding){
        this.expectedEnding = DateUtils.format(expectedEnding, "dd/MM/yyyy HH:mm:ss");
    }

    public void setStartDayConvert(ZonedDateTime startDay){
        this.startDay = DateUtils.format(startDay, "dd/MM/yyyy HH:mm:ss");
     }   
     public void setFinishDayConvert(ZonedDateTime finishDay){
         this.finishDay = DateUtils.format(finishDay, "dd/MM/yyyy HH:mm:ss");
     }

    public void setIdlabel(Long id){
        this.labelId = id;
    }
    public void setIdTaskType(Long id){
        this.taskTypeId = id;
    }
    public void setIdPriority(Long id){
        this.priorityId = id;
    }

    public void setIdSprint(Long id){
        this.sprintId = id;
    }
    public void setIdStatus(Long id) {
        this.statusId = id;
    }

    public static TaskDto of(Task entity){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        TaskDto taskDto = mapper.map(entity, TaskDto.class);
        taskDto.setExpectedStartConvert(entity.getExpectedStart());
        taskDto.setExpectedEndingConvert(entity.getExpectedEnding());
        if(entity.getStartDay() != null){
            taskDto.setStartDayConvert(entity.getStartDay());
        }
        if(entity.getFinishDay() != null){
            taskDto.setFinishDayConvert(entity.getFinishDay());
        }
        if(entity.getPriority() != null){
            taskDto.setIdPriority(entity.getPriority().getId());
        }
        if(entity.getLabel() != null){
            taskDto.setIdlabel(entity.getLabel().getId());
        }
        if(entity.getTaskType() != null){
            taskDto.setIdTaskType(entity.getTaskType().getId());
        }
        if(entity.getSprint() != null){
            taskDto.setIdSprint(entity.getSprint().getId());
        }
        if(entity.getStatus() != null){
            taskDto.setIdStatus(entity.getStatus().getId());
        }
        return taskDto;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BasicTaskDto{
        private Long id;
        private String taskName;
        private String taskNo;
        private String expectedStart;
        private String expectedEnding;
        private String description;
        private Double progress;
        private BasicEmployeeDto reporter;
        private List<BasicEmployeeDto> lstAssignee;
        private List<HashTagDto> tags;
        private BasicStatusDto status;
        private BasicSprintDto sprint;
        private PriorityDto priority;
        private TaskTypeDto taskType;

        public void setExpectedStartConvert(ZonedDateTime expectedStart){
            this.expectedStart = DateUtils.format(expectedStart, "yyyy-MM-dd");
         }   
         public void setExpectedEndingConvert(ZonedDateTime expectedEnding){
             this.expectedEnding = DateUtils.format(expectedEnding, "yyyy-MM-dd");
         }

        public static BasicTaskDto of(Task entity){
            ModelMapper mapper = new ModelMapper();
            mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
            BasicTaskDto taskDto = mapper.map(entity, BasicTaskDto.class);
            taskDto.setExpectedStartConvert(entity.getExpectedStart());
            taskDto.setExpectedEndingConvert(entity.getExpectedEnding());
            return taskDto;
        }

    }

  
}
