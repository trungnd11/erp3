package com.vdc.hrservice.hr.repository.jobLabel;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.hr.domain.jobLabel.GroupJobLabel;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupJobLabelRepository extends JpaRepository<GroupJobLabel, Long> {
    List<GroupJobLabel> findByDelFlg(Boolean delFlg);
    Optional<GroupJobLabel> findByIdAndDelFlg(Long id, Boolean delFlg);
    List<GroupJobLabel> findByGroupLabelLibraryAndDelFlg(Boolean groupLabelLibrary,Boolean delFlg);
}
