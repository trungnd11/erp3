package com.vdc.hrservice.hr.dto.targetDto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.vdc.hrservice.hr.dto.employee.EmployeeAuthorizationDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TargetDto {
    private Long id;
    private String targetName;
    private String targetDescription;
    private Float weight;
    private String shareLevel;
    private Integer targetTypes;
    private Integer targetGroup;
    private String startDay;
	private String finishDay; 
    private Double progress;
    private Character status; 
    private String method;
    private Long parrent;
    private Integer calculation;
    
    @JsonInclude(value = Include.NON_NULL)
    private Long departmentId;
    
    private Long targetLibraryId;
    
    @JsonInclude(value = Include.NON_NULL)
    private Long employeeId;
    
    private Long groupJobLabelId;
    
    private Integer totalSubTarget;
    
    private Integer totalSubTargetComplete;
    
    private Integer totalJobs;
    
    private Integer totalJobComplete;
    
    private Integer totalFeedBack;

    private Boolean hasChild;

    private List<TargetDto> targetChild;
    
    private List<EmployeeAuthorizationDto> lstEmployeeAuthorizationDto;
    
    private List<LinkTargetDto> lstLinkTargetDto;


}
