package com.vdc.hrservice.hr.domain.employee;

import javax.persistence.*;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.EmployeeForeignLanguageDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table
@Data
public class EmployeeForeignLanguage extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String name;

  @Column
  private String useListen;

  @Column
  private String useSpeak;

  @Column
  private String useRead;

  @Column
  private String understand;

  @Column
  private String useWrite;

  @Column
  private String note;

  @ManyToOne
  @JoinColumn(name = "employeeId")
  private Employee employee;

  public static EmployeeForeignLanguage of(EmployeeForeignLanguageDto languageDto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(languageDto, EmployeeForeignLanguage.class);
  }
}
