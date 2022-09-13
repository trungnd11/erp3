package com.vdc.hrservice.hr.repository.target;

import com.vdc.hrservice.hr.domain.target.LinkTarget;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkTargetRepository extends JpaRepository<LinkTarget, Long> {
    List<LinkTarget> findByRootTargetIdAndDelFlg(Long rootTargetId, Boolean delFLg);
}
