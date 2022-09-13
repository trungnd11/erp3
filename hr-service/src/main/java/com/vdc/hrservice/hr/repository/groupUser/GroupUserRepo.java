package com.vdc.hrservice.hr.repository.groupUser;

import java.util.List;

import com.vdc.hrservice.hr.domain.groupuser.GroupUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupUserRepo extends JpaRepository<GroupUser, Long> {
  List<GroupUser> findByDelFlg(Boolean delflg);

  Page<GroupUser> findByDelFlg(Boolean delflg, Pageable pageable);
}
