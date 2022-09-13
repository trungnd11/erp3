package com.vdc.hrservice.hr.service.groupuser;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
// import java.util.ArrayList;

import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.hr.domain.groupuser.GroupUser;

import com.vdc.hrservice.hr.dto.groupuser.GroupUserDto;
import com.vdc.hrservice.hr.repository.groupUser.GroupUserRepo;
import com.vdc.hrservice.hr.repository.employee.EmployeeRepository;
import com.vdc.hrservice.hr.service.employee.EmployeeService;
import com.vdc.hrservice.hr.service.groupuser.interfaceService.GroupuserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

// import com.example.demo.model.GroupUser;
// import com.example.demo.repository.EmployeeRepository;
@Service
public class GroupuserServicelmpl implements GroupuserService {

  @Autowired
  GroupUserRepo groupUserRepo;

  @Autowired
  EmployeeService employeeService;

  @Autowired
  EmployeeRepository employeeRepo;

  @Autowired
  GroupUserRepo locationRepo;

  @Override
  public GroupUserDto createGroupuser(GroupUserDto group) {
    GroupUser newGroup = new GroupUser();
    newGroup.setName(group.getName());
    newGroup.setDescription(group.getDescription());
    newGroup.setMembersId(group.getMembersId());
    groupUserRepo.save(newGroup);
    return group;
  }

  @Override
  public int deleteGroupuser(Long groupuserId) {
    GroupUser deletePart = groupUserRepo.getById(groupuserId);
    deletePart.setDelFlg(true);
    groupUserRepo.save(deletePart);
    return 1;
  }

  @Override
  public List<GroupUserDto> getGroupusers() {
    List<GroupUser> groupusers = groupUserRepo.findByDelFlg(false);
    return groupusers.stream().map(GroupUserDto::of).collect(Collectors.toList());
  }

  @Override
  public GroupUserDto updateGroupuser(GroupUserDto groupDto) {
    GroupUser updatePart = groupUserRepo.getById(groupDto.getId());
    updatePart.setName(groupDto.getName());
    updatePart.setDescription(groupDto.getDescription());
    groupUserRepo.save(updatePart);
    return groupDto;
  }

  @Override
  public Page<GroupUserDto> getGroupusersWithPage(Boolean delFlg, Pageable page) throws Exception {
    Page<GroupUser> grpUser = groupUserRepo.findByDelFlg(delFlg, page);
    return grpUser.map(GroupUserDto::of);
  }

}
