package com.vdc.hrservice.hr.dto.department;

import com.vdc.hrservice.hr.domain.department.DepartmentLocation;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepartmentLocationDto {
  private Long id;
  private String code;
  private String location;

  public static DepartmentLocationDto of(DepartmentLocation location) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(location, DepartmentLocationDto.class);
  }
}
