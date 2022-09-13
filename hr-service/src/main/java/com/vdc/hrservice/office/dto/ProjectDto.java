package com.vdc.hrservice.office.dto;

import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto.BasicEmployeeDto;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.StatusDto.BasicStatusDto;

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
public class ProjectDto {
    private Long id;
    private String projectName;
    private AttachFileDto thumnailImage;
    private String description;
    private String privacy;
    // private String projectStatus;
    private String deadLine;
    private BasicEmployeeDto teamLead;
    private List<BasicEmployeeDto> lstMember;
    private List<BasicStatusDto> status;
    private List<TaskDto> tasks;
    private List<HashTagDto> tags;
    private List<SprintDto> sprints;
    private Integer totalTask;
    private Integer totalTaskComplete;
    private String createdBy;
    private Instant createdDate;

    public void setDeadLineConvert(ZonedDateTime deadLine) {
        this.deadLine = DateUtils.format(deadLine, "yyyy-MM-dd");
    }

    public void setTaskTotal(List<Task> tasks) {
        this.totalTask = tasks.size();

    }

    public void setTaskCompleteTotal(List<Task> tasks) {
        if (tasks.size() > 0) {
            List<Task> taskCompletes = tasks.stream().filter(a -> a.getFinishDay() != null)
                    .collect(Collectors.toList());
            this.totalTaskComplete = taskCompletes.size();
        } else {
            this.totalTaskComplete = 0;
        }

    }

    public static ProjectDto of(Project entity) {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                .setSkipNullEnabled(true);
        ProjectDto projectDto = mapper.map(entity, ProjectDto.class);
        projectDto.setDeadLineConvert(entity.getDeadLine());
        if (entity.getStatus() != null) {
            projectDto.setStatus(
                    projectDto.getStatus().stream().filter(e -> !e.getDelFlg()).collect(Collectors.toList()));
        }
        if (entity.getSprints() != null) {
            projectDto.setSprints(
                    projectDto.getSprints().stream().filter(e -> !e.getDelFlg()).collect(Collectors.toList()));
        }

        return projectDto;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BasicProjectDto {
        private Long id;
        private String projectName;
        private AttachFileDto thumnailImage;
        private String description;
        private String privacy;
        // private String projectStatus;
        private String deadLine;
        private BasicEmployeeDto teamLead;
        private List<BasicEmployeeDto> lstMember;
        private List<BasicStatusDto> status;
        // private List<TaskDto> tasks;
        private List<HashTagDto> tags;
        // private List<SprintDto> sprints;
        private Integer totalTask;
        private Integer totalTaskComplete;
        private String createdBy;
        private Instant createdDate;

        public static BasicProjectDto of(Project pro) {
            ModelMapper mapper = new ModelMapper();
            return mapper.map(pro, BasicProjectDto.class);
        }
    }
}
