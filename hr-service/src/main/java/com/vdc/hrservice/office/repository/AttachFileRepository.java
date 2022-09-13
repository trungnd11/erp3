package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.AttachFile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttachFileRepository extends JpaRepository<AttachFile, Long> {
    List<AttachFile> findByTaskIdAndDelFlg(Long taskId, Boolean delFlg);

    Optional<AttachFile> findByIdAndDelFlg(Long id, Boolean delFlg);
    
    Optional<AttachFile> findByDownloadUriAndDelFlgIsFalse(String downloadUri);
}
