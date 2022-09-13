package com.vdc.hrservice.office.repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByDelFlg(Boolean delFlg);
    Page<Project> findByDelFlg(Boolean delFlg, Pageable pageable);
    Optional<Project> findByIdAndDelFlg(Long id, Boolean delFlg);

    @Query(value = "SELECT p.* FROM  office_project p JOIN office_project_employee pe ON  p.id = pe.project_id WHERE p.del_flg = 0 AND pe.employee_id = :employeeId  OR p.privacy = 'PUBLIC' AND p.del_flg = 0 GROUP BY p.id  ORDER BY p.id DESC", nativeQuery = true)
    List<Project> findAllProjectByEmployeeId(@Param("employeeId") Long employeeId);

    @Query(value = "SELECT p.* FROM office_project p JOIN office_project_employee pe ON p.id = pe.project_id  WHERE p.employee_id = :employeeId OR pe.employee_id = :employeeId AND p.privacy = :privacy AND p.del_flg = :delFlg", nativeQuery = true)
    List<Project> findProjectByEmployeeIdAndPrivacyAndDelFlg(@Param("employeeId") Long employeeId,@Param("privacy") String privacy, @Param("delFlg") Boolean delFlg);

    List<Project> findByPrivacyAndDelFlg(String privacy,Boolean delFlg);

    @Query(value = "SELECT p.* FROM  office_project p  WHERE LOWER(p.project_name) LIKE %:projectName%  AND p.del_flg = :delFlg ORDER BY p.id DESC", nativeQuery = true)
    Page<Project> findProjectByProjectNameAndDelFlg(@Param("projectName") String projectName, @Param("delFlg") Boolean delFlg, Pageable pageable);

    @Query(value = "SELECT p.* FROM  office_project p  WHERE  p.dead_line = :deadLine AND p.del_flg = :delFlg ORDER BY p.id DESC", nativeQuery = true)
    Page<Project> findProjectByDeadLineAndDelFlg( @Param("deadLine") ZonedDateTime deadLine, @Param("delFlg") Boolean delFlg, Pageable pageable);

    @Query(value = "SELECT p.* FROM  office_project p  WHERE (:projectName IS NULL OR LOWER(p.project_name LIKE %:projectName%)) AND (:deadLine IS NULL OR p.dead_line = :deadLine)  AND p.del_flg = :delFlg ORDER BY p.id DESC", nativeQuery = true)
    Page<Project> findProjectByProjectNameAndDeadLineAndDelFlg(@Param("projectName") String projectName, @Param("deadLine") ZonedDateTime deadLine, @Param("delFlg") Boolean delFlg, Pageable pageable);

    @Query(value = "SELECT p.* FROM  office_project p  WHERE (p.dead_line >= :startDay AND p.dead_line <= :endDay)  AND p.del_flg = :delFlg ORDER BY p.id DESC", nativeQuery = true)
    Page<Project> findProjectByDeadLineBetWeen(@Param("startDay") ZonedDateTime startDay, @Param("endDay") ZonedDateTime endDay, @Param("delFlg") Boolean delFlg, Pageable pageable);

    Page<Project> findByDeadLineAndDelFlg(ZonedDateTime deadLine, Boolean delFlg, Pageable pageable);

    @Query(value="SELECT p.* FROM office_project p JOIN office_project_employee pe ON p.id = pe.project_id WHERE (pe.employee_id = :userId OR p.employee_id =:userId) GROUP BY p.id",nativeQuery = true)
    Page<Project> getProjectUser(@Param("userId") Long userId,Pageable pageable);
}
