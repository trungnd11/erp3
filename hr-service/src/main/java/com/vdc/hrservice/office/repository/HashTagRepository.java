package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.HashTag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface HashTagRepository extends JpaRepository<HashTag, Long> {
    @Query(value = "SELECT ht.* FROM office_hash_tag ht JOIN office_project_hash_tag pt ON ht.id = pt.hash_tag_id WHERE pt.project_id = :projectId  AND ht.del_flg = :delFlg", nativeQuery = true)
    List<HashTag> findHashTagByProjectIdAndDelFlg(Long projectId, Boolean delFlg);
    Optional<HashTag> findByIdAndDelFlg(Long id, Boolean delFlg);
    List<HashTag> findByDelFlg(Boolean delFlg);
}
