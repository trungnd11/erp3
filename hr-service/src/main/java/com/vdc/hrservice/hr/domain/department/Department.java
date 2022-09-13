package com.vdc.hrservice.hr.domain.department;

import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.dto.department.DepartmentDto;
import com.vdc.hrservice.hr.org_team.domain.Team;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

import lombok.Data;
import lombok.ToString;
import lombok.EqualsAndHashCode.Exclude;

@Data
@Table
@Entity
public class Department extends AbstractAuditingEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty
  @Column(name = "code", nullable = true, unique = true)
  private String code;

  @NotEmpty
  @Column(name = "name", nullable = true)
  private String name;

  @Column(name = "budget", nullable = true)
  private Double budget;

  @Column(name = "parent", nullable = true)
  private Long parent;

  @Column(name = "manager", nullable = true)
  private Long manager;

  @Column(name = "level", nullable = true)
  private Long level;

  @Column(name = "position", nullable = true)
  private Long position;

  @Column
  private String descriptions;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "department_location", joinColumns = @JoinColumn(name = "department_id"), inverseJoinColumns = @JoinColumn(name = "location_id"))
  private List<DepartmentLocation> locations;

  @OneToMany(mappedBy = "empDepartment", cascade = CascadeType.ALL)
  @JsonIgnore
  private List<Employee> employees;

  @OneToMany(mappedBy = "department", fetch = FetchType.LAZY)
  @Fetch(FetchMode.SUBSELECT)
  @ToString.Exclude
  private List<Team> teams;

  public static Department of(DepartmentDto part) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(part, Department.class);
  }

}
