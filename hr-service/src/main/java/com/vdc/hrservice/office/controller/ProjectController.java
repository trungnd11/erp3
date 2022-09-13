package com.vdc.hrservice.office.controller;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.hr.service.employee.EmployeeService;
import com.vdc.hrservice.office.domain.Project;
import com.vdc.hrservice.office.domain.Sprint;
import com.vdc.hrservice.office.domain.Status;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.ProjectDto;
import com.vdc.hrservice.office.dto.StatusDto;
import com.vdc.hrservice.office.dto.ProjectDto.BasicProjectDto;
import com.vdc.hrservice.office.service.AttachFileService;
import com.vdc.hrservice.office.service.FileService;
import com.vdc.hrservice.office.service.ProjectService;
import com.vdc.hrservice.office.service.SprintService;
import com.vdc.hrservice.office.service.StatusService;
import com.vdc.hrservice.office.service.TaskService;

import org.apache.poi.hssf.dev.ReSave;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
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
@RequestMapping("/api/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private StatusService statusService;

    @Autowired
    private SprintService sprintService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private AttachFileService attachFileService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllProject(
            @RequestParam(name = "projectName", required = false) String projectName,
            @RequestParam(name = "startDay", required = false) String startDay,
            @RequestParam(name = "endDay", required = false) String endDay,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            EmployeeDto currentempl = employeeService.getCurrentEmployee();
            Pageable paging = PageRequest.of(page, size);
            Map<String, Object> response = new HashMap<>();
            List<ProjectDto> pageContent = new ArrayList<ProjectDto>();
            List<ProjectDto> lstProjects = projectService.findAllProject(currentempl.getId());
            if (projectName == null && startDay == null && endDay == null) {
                Page<ProjectDto> pageProject = new PageImpl<>(lstProjects, paging, lstProjects.size());
                pageContent = pageProject.getContent();
                response.put("lstProject", pageContent);
                response.put("currentPage", pageProject.getNumber());
                response.put("totalItems", pageProject.getTotalElements());
                response.put("totalPages", pageProject.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            if (projectName != null && startDay == null && endDay == null) {
                List<ProjectDto> filterProject = lstProjects.stream()
                        .filter(e -> e.getProjectName().toLowerCase().contains(projectName))
                        .collect(Collectors.toList());
                Page<ProjectDto> pageProject = new PageImpl<>(filterProject, paging, lstProjects.size());
                pageContent = pageProject.getContent();
                response.put("lstProject", pageContent);
                response.put("currentPage", pageProject.getNumber());
                response.put("totalItems", pageProject.getTotalElements());
                response.put("totalPages", pageProject.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            if (projectName != null && startDay != null && endDay == null) {
                List<ProjectDto> filterProject = lstProjects.stream()
                        .filter(e -> e.getProjectName().toLowerCase().contains(projectName)
                                && e.getDeadLine().contains(startDay))
                        .collect(Collectors.toList());
                Page<ProjectDto> pageProject = new PageImpl<>(filterProject, paging, lstProjects.size());
                pageContent = pageProject.getContent();
                response.put("lstProject", pageContent);
                response.put("currentPage", pageProject.getNumber());
                response.put("totalItems", pageProject.getTotalElements());
                response.put("totalPages", pageProject.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            if (projectName == null && startDay != null && endDay == null) {
                List<ProjectDto> filterProject = lstProjects.stream().filter(e -> e.getDeadLine().contains(startDay))
                        .collect(Collectors.toList());
                Page<ProjectDto> pageProject = new PageImpl<>(filterProject, paging, lstProjects.size());
                pageContent = pageProject.getContent();
                response.put("lstProject", pageContent);
                response.put("currentPage", pageProject.getNumber());
                response.put("totalItems", pageProject.getTotalElements());
                response.put("totalPages", pageProject.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            if (projectName == null && startDay != null && endDay != null) {
                List<Project> lstConvert = lstProjects.stream().map(Project::of).collect(Collectors.toList());
                List<Project> filterProject = lstConvert.stream()
                        .filter(e -> e.getDeadLine().isAfter(DateUtils.convertShort2Zone(startDay))
                                && e.getDeadLine().isBefore(DateUtils.convertShort2Zone(endDay)))
                        .collect(Collectors.toList());
                Page<ProjectDto> pageProject = new PageImpl<>(filterProject.stream().map(project -> {
                    ProjectDto dto = ProjectDto.of(project);
                    int totalTask = projectService.getTotalTasks(project.getTasks());
                    int totalTaskComplete = projectService.getTotalTasksComplete(project.getTasks());
                    dto.setTotalTask(totalTask);
                    dto.setTotalTaskComplete(totalTaskComplete);

                    return dto;
                }).collect(Collectors.toList()), paging, lstProjects.size());
                pageContent = pageProject.getContent();
                response.put("lstProject", pageContent);
                response.put("currentPage", pageProject.getNumber());
                response.put("totalItems", pageProject.getTotalElements());
                response.put("totalPages", pageProject.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            if (projectName != null && startDay != null && endDay != null) {
                List<Project> lstConvert = lstProjects.stream().map(Project::of).collect(Collectors.toList());
                List<Project> filterProject = lstConvert.stream()
                        .filter(e -> e.getProjectName().toLowerCase().contains(projectName)
                                && e.getDeadLine().isAfter(DateUtils.convertShort2Zone(startDay))
                                && e.getDeadLine().isBefore(DateUtils.convertShort2Zone(endDay)))
                        .collect(Collectors.toList());
                Page<ProjectDto> pageProject = new PageImpl<>(filterProject.stream().map(project -> {
                    ProjectDto dto = ProjectDto.of(project);
                    int totalTask = projectService.getTotalTasks(project.getTasks());
                    int totalTaskComplete = projectService.getTotalTasksComplete(project.getTasks());
                    dto.setTotalTask(totalTask);
                    dto.setTotalTaskComplete(totalTaskComplete);

                    return dto;
                }).collect(Collectors.toList()), paging, lstProjects.size());
                pageContent = pageProject.getContent();
                response.put("lstProject", pageContent);
                response.put("currentPage", pageProject.getNumber());
                response.put("totalItems", pageProject.getTotalElements());
                response.put("totalPages", pageProject.getTotalPages());
                return new ResponseEntity<>(response, HttpStatus.OK);
            }

            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getProjectById(@PathVariable("id") Long id) {
        try {
            ProjectDto response = projectService.findProjectById(id, Constants.ALIVE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProject(@RequestBody ProjectDto dto) {
        try {
            Project response = projectService.createProject(dto);
            return new ResponseEntity<>(ProjectDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            System.out.println(e);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProjectById(@RequestBody ProjectDto dto) {
        try {
            Project response = projectService.updateProject(dto);

            return new ResponseEntity<>(ProjectDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProjectById(@PathVariable("id") Long id) {
        try {
            Project deleteProject = projectService.deleteProject(id);
            List<Status> lstStatus = deleteProject.getStatus().stream().filter(e -> !e.isDelFlg())
                    .collect(Collectors.toList());
            for (Status status : lstStatus) {
                statusService.deleteStattusById(status.getId());
            }

            List<Sprint> sprints = deleteProject.getSprints().stream().filter(e -> !e.isDelFlg())
                    .collect(Collectors.toList());
            for (Sprint sprint : sprints) {
                sprintService.deleteSprintById(sprint.getId());
            }

            if (deleteProject.getThumnailImage() != null) {
                attachFileService.deleteAttachFile(deleteProject.getThumnailImage().getId());
            }
            List<Task> tasks = deleteProject.getTasks().stream().filter(e -> !e.isDelFlg())
                    .collect(Collectors.toList());
            for (Task task : tasks) {
                taskService.deleteTask(task.getId());
            }

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            // TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/user")
    public ResponseEntity<?> getProjectUser(@RequestParam(value = "userId", required = false) Long userId,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "startDay", required = false) String startDay,
            @RequestParam(value = "endDay", required = false) String endDay,
            Pageable pageable) {
        try {
            Page<BasicProjectDto> page = projectService.getProjectUser(userId, name, startDay, endDay, pageable);
            return ResponseEntity.ok().body(page);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    // @GetMapping("/filter")

}
