package com.vdc.hrservice.hr.service.groupuser.interfaceService;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vdc.hrservice.hr.dto.groupuser.GroupUserDto;

public interface GroupuserService {
  public abstract List<GroupUserDto> getGroupusers();

  public abstract Page<GroupUserDto> getGroupusersWithPage(Boolean delFlg, Pageable page) throws Exception;

  public abstract GroupUserDto createGroupuser(GroupUserDto part);

  public abstract int deleteGroupuser(Long GroupuserId);

  public abstract GroupUserDto updateGroupuser(GroupUserDto part);

}
