package com.vdc.hrservice.hr.domain.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeEducationDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Data
@Table
public class EmployeeEducation extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  @NotEmpty
  private String degree;

  @Column
  @NotEmpty
  private String course;

  @Column
  @NotEmpty
  private String schoolName;

  @Column
  @NotEmpty
  private String faculty;

  @Column
  @NotEmpty
  private String specialized;

  @Column
  @NotEmpty
  private String classification;

  @ManyToOne
  @JoinColumn(name = "employeeId")
  @JsonIgnore
  private Employee employee;

  public static EmployeeEducation of(EmployeeEducationDto dto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(dto, EmployeeEducation.class);
  }
}
