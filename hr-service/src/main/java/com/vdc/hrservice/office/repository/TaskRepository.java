package com.vdc.hrservice.office.repository;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.TaskDto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Page<Task> findByProjectIdAndDelFlg(Long projectId, Boolean delFlg, Pageable pageable);
    List<Task> findByProjectIdAndDelFlg(Long projectId, Boolean delFlg);
    List<Task> findByStatusIdAndDelFlg(Long statusId, Boolean delFlg);
    List<Task> findByParrentAndDelFlg(Long parrent, Boolean delFlg);
    List<Task> findBySprintId(Long sprintId);
    List<Task> findBySprintIdAndStatusIdAndDelFlg(Long sprintId, Long statusId, Boolean delFlg);
    Optional<Task> findByIdAndDelFlg(Long id, Boolean delFlg);

    Page<Task> findByTaskNameContainingAndDelFlg(String taskName, Boolean delFlg, Pageable pageable);
    Page<Task> findByTaskNoContainingAndDelFlg(String taskN0, Boolean delFlg, Pageable pageable);
    Page<Task> findBySprintIdAndDelFlg(Long sprintId, Boolean delFlg, Pageable pageable);

    @Query(value = "SELECT t.* FROM office_task t JOIN employee e ON t.employee_id = e.id WHERE LOWER(e.full_name) LIKE %:search% OR LOWER(t.task_name) LIKE %:search% OR LOWER(t.task_No) LIKE %:search% AND t.del_flg = :delFlg", nativeQuery = true)
    Page<Task> findTasksByFullNameOrTaskNameOrTaskNoAndDelFlg(@Param("search") String search, @Param("delFlg") Boolean delFlg, Pageable pageable);

    @Query(value = "SELECT t.* FROM office_task t JOIN office_project p ON t.project_id = p.id WHERE t.project_id = :projectId AND t.sprint_id IS NULL AND t.del_flg = :delFlg", nativeQuery = true)
    List<Task> findTaskByProjectIdAndSprintIdIsNullAndDelFlg(Long projectId, Boolean delFlg);

    @Query(value = "SELECT NEW com.vdc.hrservice.office.dto.TaskDto(T.id) FROM Task T WHERE T.id = :id AND T.delFlg=false")
    Optional<TaskDto> getTaskById(@Param("id") Long id);

    List<Task> findByProjectIdAndSprintIdAndDelFlg(Long projectId, Long sprintId, Boolean delFlg);
}
