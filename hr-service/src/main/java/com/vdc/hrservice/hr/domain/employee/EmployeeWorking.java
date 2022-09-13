package com.vdc.hrservice.hr.domain.employee;

import java.util.Date;

import javax.persistence.*;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeWorkingDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table
@Data
public class EmployeeWorking extends AbstractAuditingEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String company;

  @Column
  @Temporal(TemporalType.DATE)
  private Date startDate;

  @Column
  @Temporal(TemporalType.DATE)
  private Date finishDate;

  @Column
  private String position;

  @Column
  private Long salary;

  @Column
  private String jobDescription;

  @ManyToOne
  @JoinColumn(name = "employeeId")
  private Employee employee;

  public static EmployeeWorking of(EmployeeWorkingDto workingDto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(workingDto, EmployeeWorking.class);
  }
}
