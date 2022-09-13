package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Priority;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriorityRepository extends JpaRepository<Priority, Long> {
    List<Priority> findByDelFlg(Boolean delFlg);
    Optional<Priority> findByIdAndDelFlg(Long id, Boolean delFlg);
}
