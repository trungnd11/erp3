package com.vdc.hrservice.hr.domain.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeCertificateDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table
@Data
public class EmployeeCertificate extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;
  
  @Column
  private String yearCompleted;
  
  @Column
  private String degreeUnit;
  
  @Column
  private String note;

  @ManyToOne
  @JoinColumn(name = "employeeId")
  @JsonIgnore
  private Employee employee;

  public static EmployeeCertificate of(EmployeeCertificateDto certificateDto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(certificateDto, EmployeeCertificate.class);
  }
  
}
