package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Status;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    List<Status> findByDelFlg(Boolean delFlg);
    List<Status> findByProjectIdAndDelFlg(Long projectId, Boolean delFlg);
    List<Status> findByDefaultEntityAndDelFlg(Boolean defaultEntity, Boolean delFlg);
    Optional<Status> findByIdAndDelFlg(Long id , Boolean delFlg);
}
