package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Work;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByTaskIdAndDelFlg(Long taskId, Boolean delFlg);
    Optional<Work> findByIdAndDelFlg(Long id, Boolean delFlg);
    List<Work> findByTaskIdAndWorkStatusAndDelFlg(Long taskId, String workStatus, Boolean delFlg);
}
