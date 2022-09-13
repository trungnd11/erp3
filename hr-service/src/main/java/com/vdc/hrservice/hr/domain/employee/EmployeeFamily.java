package com.vdc.hrservice.hr.domain.employee;

import java.time.ZonedDateTime;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeFamilyDto;
import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Data
@Table
public class EmployeeFamily extends AbstractAuditingEntity {
	
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  @NotEmpty
	private String fullName;
	
  @Column
  @NotEmpty
	private String relationship;
	
	@Column
	private String phone;
	
	@Column
	private String address;
	
	@Column
	private String job;
	
  @Column
  @Temporal(TemporalType.DATE)
	private Date birthday;
	
	@ManyToOne
	@JoinColumn(name = "employeeId")
  private Employee employee;
  
  public EmployeeFamily of(EmployeeFamilyDto employeeFamilyDto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(employeeFamilyDto, EmployeeFamily.class);
  }
	
}	
