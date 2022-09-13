package com.vdc.hrservice.hr.repository.jobLabel;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.hr.domain.jobLabel.JobLabel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobLabelRepository extends JpaRepository<JobLabel, Long> {
    List<JobLabel> findByGroupJobLabelIdAndDelFlg(Long groupJobLabelId, Boolean delFlg);
    List<JobLabel> findByDelFlg(Boolean delFlg);
    Optional<JobLabel> findByIdAndDelFlg(Long id, Boolean delFlg);
}
