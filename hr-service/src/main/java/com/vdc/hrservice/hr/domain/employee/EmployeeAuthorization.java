package com.vdc.hrservice.hr.domain.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeAuthorizationDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "employee_authorization")
public class EmployeeAuthorization extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "employee_main_id",nullable = true)
	private Long employeeMainId;
	
	@Column(name="employee_id",nullable = true)
	private Long employeeId;
		
	@Column(name = "target_id" , nullable = false)
	private Long targetId;
	//Quyền đọc
    @Column(name="role_read", nullable = false , columnDefinition = "boolean default true")
    private Boolean roleRead = true ;
    
    //Quyền thông báo
    @Column(name="role_notification",nullable = false)
    private Boolean roleNotification ;
    
    
    //Quyền thảo luận
    @Column(name="role_discussion", nullable = false)
    private Boolean roleDiscussion ;
    
    
    //Quyền báo cáo
    @Column(name="role_report",nullable = false)
    private Boolean roleReport;
    
    //Quyền ghi công việc
    @Column(name="role_write_job",nullable = false)
    private Boolean roleWriteJob ;
    
    
    //Quyền ghi mục tiêu
    @Column(name="role_write_target",nullable = false)
    private Boolean roleWriteTarget ;

   //Quyền mục tiêu con hạn chế
    @Column(name="role_limited_subTarget",nullable = false)
    private Boolean roleLimitedSubTarget ;

    public static EmployeeAuthorization of(EmployeeAuthorizationDto dto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, EmployeeAuthorization.class);
    }
}
