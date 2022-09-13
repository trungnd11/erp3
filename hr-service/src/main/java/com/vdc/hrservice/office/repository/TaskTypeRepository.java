package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.TaskType;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeRepository extends JpaRepository<TaskType, Long> {
    List<TaskType> findByDelFlg(Boolean delFlg);
    Optional<TaskType> findByIdAndDelFlg(Long id, Boolean delFlg);
}
