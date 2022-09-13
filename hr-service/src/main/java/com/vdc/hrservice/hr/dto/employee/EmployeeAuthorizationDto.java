package com.vdc.hrservice.hr.dto.employee;

import com.vdc.hrservice.hr.domain.employee.EmployeeAuthorization;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeAuthorizationDto {
    private Long id;
    private Long employeeId;
	private Long targetId;
	private Boolean roleRead ;
	private Boolean roleNotification ;
	private Boolean roleDiscussion ;
	private Boolean roleReport;
	private Boolean roleWriteJob ;
	private Boolean roleWriteTarget ;
	private Boolean roleLimitedSubTarget ;

    public static EmployeeAuthorizationDto of(EmployeeAuthorization employeeAuthorization){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(employeeAuthorization, EmployeeAuthorizationDto.class);
    }
}
