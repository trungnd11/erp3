package com.vdc.hrservice.hr.repository.target;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.hr.domain.target.TargetLibrary;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TargetLibraryRepository extends JpaRepository<TargetLibrary, Long> {
    List<TargetLibrary> findByDelFlg(Boolean delFlg);

    Optional<TargetLibrary> findByIdAndDelFlg(Long id, Boolean delFlg);
}
