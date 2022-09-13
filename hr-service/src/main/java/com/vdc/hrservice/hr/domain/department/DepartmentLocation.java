package com.vdc.hrservice.hr.domain.department;

import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.department.DepartmentLocationDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table(name = "locations")
@Data
public class DepartmentLocation extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(unique = true, nullable = true)
  @NotEmpty
  private String code;

  @Column
  @NotEmpty
  private String location;

  @ManyToMany(mappedBy = "locations")
  @JsonIgnore
  private List<Department> departments;

  public static DepartmentLocation of(DepartmentLocationDto locationDto) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(locationDto, DepartmentLocation.class);
  }
}
