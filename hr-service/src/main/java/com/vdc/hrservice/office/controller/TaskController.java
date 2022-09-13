package com.vdc.hrservice.office.controller;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.domain.Work;
import com.vdc.hrservice.office.dto.AttachFileDto;
import com.vdc.hrservice.office.dto.SprintDto;
import com.vdc.hrservice.office.dto.TaskDto;
import com.vdc.hrservice.office.dto.WorkDto;
import com.vdc.hrservice.office.dto.TaskDto.BasicTaskDto;
import com.vdc.hrservice.office.service.AttachFileService;
import com.vdc.hrservice.office.service.SprintService;
import com.vdc.hrservice.office.service.TaskService;
import com.vdc.hrservice.office.service.WorkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @Autowired
    private WorkService workService;

    @Autowired
    private SprintService sprintService;

    @GetMapping("/all/{sprintId}")
    public ResponseEntity<?> getAllTaskBySprintId(@PathVariable("sprintId") Long sprintId,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "5") Integer size) {
        try {
            List<TaskDto> lstTask = new ArrayList<TaskDto>();
            Pageable paging = PageRequest.of(page, size);
            Page<TaskDto> dto = taskService.findTasksBySprintIdAndDelFlg(sprintId, Constants.ALIVE, paging);
            lstTask = dto.getContent();
            Map<String, Object> response = new HashMap<>();
            response.put("lstTask", lstTask);
            response.put("currentPage", dto.getNumber());
            response.put("totalItems", dto.getTotalElements());
            response.put("totalPages", dto.getTotalPages());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/allTasks/{sprintId}/{statusId}")
    public ResponseEntity<?> getTasksBySprintIdAndStatusId(@PathVariable("sprintId") Long sprintId,
            @PathVariable("statusId") Long statusId) {
        try {
            List<TaskDto> tasks = taskService.findTasksBySprintIdAndStatusId(sprintId, statusId, Constants.ALIVE);
            return new ResponseEntity<>(tasks, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/backLog/{projectId}")
    public ResponseEntity<?> getProjectBackLog(@PathVariable("projectId") Long projectId) {
        try {
            List<BasicTaskDto> tasks = taskService.findTaskByProjectId(projectId, Constants.ALIVE);
            List<BasicTaskDto> tasksProject = tasks.stream().filter(t -> t.getSprint() == null)
                    .collect(Collectors.toList());
            List<BasicTaskDto> tasksSprint = tasks.stream().filter(t -> t.getSprint() != null)
                    .collect(Collectors.toList());
            Map<String, Object> response = new HashMap<>();
            response.put("taskNoSprintId", tasksProject);
            response.put("sprint", tasksSprint);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/searchTask")
    public ResponseEntity<?> getTasksByTaskNameOrTaskNo(
            @RequestParam(name = "search") String search,
            @RequestParam(name = "page", defaultValue = "0") Integer page,
            @RequestParam(name = "size", defaultValue = "5") Integer size) {
        try {
            List<TaskDto> lstTask = new ArrayList<TaskDto>();
            Pageable paging = PageRequest.of(page, size);
            Page<TaskDto> dto = taskService.findTasksByFullNameOrTaskNameOrTaskNoAndDelFlg(search, Constants.ALIVE,
                    paging);
            lstTask = dto.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("lstTask", lstTask);
            response.put("currentPage", dto.getNumber());
            response.put("totalItems", dto.getTotalElements());
            response.put("totalPages", dto.getTotalPages());
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/status/{statusId}")
    public ResponseEntity<?> getAllTaskByStatusId(@PathVariable("statusId") Long statusId) {
        try {
            List<TaskDto> lstTask = taskService.findTaskByStatusId(statusId, Constants.ALIVE);
            return new ResponseEntity<>(lstTask, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/parrent/{parrent}")
    public ResponseEntity<?> getSubTask(@PathVariable("parrent") Long parrent) {
        try {
            List<TaskDto> lstTask = taskService.findAllTaskByParrent(parrent, Constants.ALIVE);
            return new ResponseEntity<>(lstTask, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable("id") Long id) {
        try {
            TaskDto response = taskService.findTaskById(id, Constants.ALIVE);
            Map<String, Object> res = new HashMap<>();
            res.put("task", response);
            if (response.getStartDay() != null
                    && response.getTypeDuration().compareTo(Constants.TYPE_DURATION.DATE) == 0) {
                String duration = DateUtils.getDurationByDate(response.getExpectedEnding());
                res.put("duration", duration);
            }
            if (response.getStartDay() != null
                    && response.getTypeDuration().compareTo(Constants.TYPE_DURATION.HOUR) == 0) {
                String duration = DateUtils.getDurationByHours(response.getExpectedEnding());
                res.put("duration", duration);
            }
            if (response.getFinishDay() != null
                    && response.getTypeDuration().compareTo(Constants.TYPE_DURATION.DATE) == 0) {
                String duration = DateUtils.getDurationFinishDayByDate(response.getFinishDay(),
                        response.getExpectedEnding());
                res.put("duration", duration);
            }
            if (response.getFinishDay() != null
                    && response.getTypeDuration().compareTo(Constants.TYPE_DURATION.HOUR) == 0) {
                String duration = DateUtils.getDurationFinishDayByHours(response.getFinishDay(),
                        response.getExpectedEnding());
                res.put("duration", duration);
            }
            if (response.getStartDay() == null && response.getFinishDay() == null) {
                res.put("duration", null);
            }
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<?> getTasksByProjectIdAndSpringIdIsNull(@PathVariable("projectId") Long projectId) {
        try {
            List<TaskDto> response = taskService.findTaskByProjectIdAndDelFlg(projectId, Constants.ALIVE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTask(
            @RequestParam(name = "projectId") Long projectId,
            @RequestParam(name = "sprintId", required = false) Long sprintId,
            @RequestParam(name = "statusId", required = false) Long statusId,
            @RequestBody TaskDto dto) {
        try {
            Task response = taskService.createNewTaskByProjectId(projectId, sprintId, statusId, dto);
            return new ResponseEntity<>("Create task success", HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTask(
            @RequestParam(name = "sprintId", required = false) Long sprintId,
            @RequestParam(name = "statusId", required = false) Long statusId,
            @RequestBody TaskDto dto) {
        try {
            Task response = taskService.updateTask(sprintId, statusId, dto);
            return new ResponseEntity<>(TaskDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateTaskStatus(@PathVariable("id") Long taskId, @RequestParam(name = "statusId") Long statusId) {
        try {

            TaskDto task = taskService.updateStatus(taskId, statusId);
            return ResponseEntity.ok().body(task);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable("id") Long id){
        try {
            taskService.deleteTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
