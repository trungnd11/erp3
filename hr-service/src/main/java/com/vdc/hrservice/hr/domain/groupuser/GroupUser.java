package com.vdc.hrservice.hr.domain.groupuser;

import java.lang.annotation.Retention;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotEmpty;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.dto.groupuser.GroupUserDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Table
@Entity

public class GroupUser extends AbstractAuditingEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotEmpty
  @Column(name = "name", nullable = true, unique = true)
  private String name;

  @Column(name = "description")
  private String description;

  @Column(name = "membersId")
  private String membersId;

  public static GroupUser of(GroupUserDto group) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(group, GroupUser.class);
  }
}
