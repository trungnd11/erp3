package com.vdc.hrservice.hr.repository.employee;

import com.vdc.hrservice.hr.domain.employee.Position;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {
    
    @Query(value = "SELECT p From Position p LEFT JOIN FETCH p.roles WHERE upper(p.name) LIKE UPPER(CONCAT('%',:key,'%')) AND p.delFlg=0",
    countQuery = "SELECT count(p) From Position p Where upper(p.name) Like UPPER(CONCAT('%',:key,'%')) AND p.delFlg=0")
    Page<Position> findPositionByKey(@Param("key") String key, Pageable pageable);
}
