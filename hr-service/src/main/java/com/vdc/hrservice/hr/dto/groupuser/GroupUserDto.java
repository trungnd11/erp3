package com.vdc.hrservice.hr.dto. groupuser;




import java.util.List;

import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.groupuser.GroupUser;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GroupUserDto {
  
  private Long id;
  private String description;
  private String name;
  private String membersId;
 
  public static GroupUserDto of(GroupUser group) {
    ModelMapper mapper = new ModelMapper();
    return mapper.map(group, GroupUserDto.class);
  }
}