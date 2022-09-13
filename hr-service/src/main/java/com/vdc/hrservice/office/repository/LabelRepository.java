package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Label;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends JpaRepository<Label, Long> {
    List<Label> findByDelFlg(Boolean delFlg);
    Optional<Label> findByIdAndDelFlg(Long id, Boolean delFlg);
}
