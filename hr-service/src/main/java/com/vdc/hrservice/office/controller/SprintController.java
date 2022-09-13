package com.vdc.hrservice.office.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Sprint;
import com.vdc.hrservice.office.domain.Task;
import com.vdc.hrservice.office.dto.ProjectDto;
import com.vdc.hrservice.office.dto.SprintDto;
import com.vdc.hrservice.office.dto.TaskDto;
import com.vdc.hrservice.office.repository.TaskRepository;
import com.vdc.hrservice.office.service.SprintService;
import com.vdc.hrservice.office.service.TaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sprint")
public class SprintController {
    @Autowired
    private SprintService sprintService;

    @Autowired 
    private TaskService taskService;

    @Autowired
    private TaskRepository taskRepository;

    @GetMapping("/all/{projectId}")
    public ResponseEntity<?> getAllSprint(@PathVariable("projectId") Long projectId){
        try {
            List<SprintDto> sprints = sprintService.findAllByProjectId(projectId, Constants.ALIVE);
        
            return new ResponseEntity<>(sprints, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSprintById(@PathVariable("id") Long id){
        try {
            SprintDto res = sprintService.findSprintById(id, Constants.ALIVE);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create/{projectId}")
    public ResponseEntity<?> createSprint(@PathVariable("projectId") Long projectId, @RequestBody SprintDto dto){
        try {
            Sprint sprint = sprintService.createNewSprinnt(projectId, dto);
            return new ResponseEntity<>(SprintDto.of(sprint), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{projectId}")
    public ResponseEntity<?> updateSprint(@PathVariable("projectId") Long projectId, @RequestBody SprintDto dto){
        try {
            Sprint sprint = sprintService.updateSprint(projectId, dto);
            return new ResponseEntity<>(SprintDto.of(sprint), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteSprint(@PathVariable("id") Long id){
        try {
            sprintService.deleteSprintById(id);
            List<Task> lstTask = taskRepository.findBySprintId(id);
            lstTask.stream().forEach(e -> {
                taskService.updateTaskBySprint(e);
            });
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
