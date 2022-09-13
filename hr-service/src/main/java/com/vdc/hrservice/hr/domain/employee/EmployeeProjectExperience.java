package com.vdc.hrservice.hr.domain.employee;

import javax.persistence.*;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeProjectExperienceDto;

import org.hibernate.annotations.GeneratorType;
import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table
@Data
public class EmployeeProjectExperience extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;

  @Column
  private String description;

  @Column
  private String startYear;

  @Column
  private Long projectTime;

  @Column
  private Long numberPeople;

  @Column
  private String position;

  @Column
  private String jobDescription;

  @Column
  private String technologyUsed;

  @Column
  private String implementationCompany;

  @Column
  private String customer;

  @ManyToOne
  @JoinColumn(name = "employeeId")
  private Employee employee;

  public static EmployeeProjectExperience of(EmployeeProjectExperienceDto projectDto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(projectDto, EmployeeProjectExperience.class);
  }

} 
