package com.vdc.hrservice.hr.dto.groupuser;

// import com.vdc.hrservice.hr.domain.groupuser.GroupLocation;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupuserLocationDto {
  private Long id;
  private String Describe;
  private String location;

  public static GroupuserLocationDto of(GroupuserLocationDto location) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(location, GroupuserLocationDto.class);
  }
}
