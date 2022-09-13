package com.vdc.hrservice.hr.domain.employee;

import java.util.Date;

import javax.persistence.*;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeSpecializeDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table
@Data
public class EmployeeSpecialize extends AbstractAuditingEntity {
  
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String specialize;

  @Column
  private Date usageTime;

  @Column
  private Date lastUsedTime;

  @Column
  private String note;

  @ManyToOne
  @JoinColumn(name = "employeeId")
  private Employee employee;

  public static EmployeeSpecialize of(EmployeeSpecializeDto specialize) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(specialize, EmployeeSpecialize.class);
  }
}
