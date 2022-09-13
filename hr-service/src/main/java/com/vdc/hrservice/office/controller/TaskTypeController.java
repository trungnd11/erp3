package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.TaskType;
import com.vdc.hrservice.office.dto.TaskTypeDto;
import com.vdc.hrservice.office.service.TaskTypeService;

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
@RequestMapping("/api/taskType")
public class TaskTypeController {
    @Autowired
    private TaskTypeService taskTypeService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTakType(){
        try {
            List<TaskTypeDto> lstDto = taskTypeService.findAllTaskType(Constants.ALIVE);
            return new ResponseEntity<>(lstDto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskTypeById(@PathVariable("id") Long id){
        try {
            TaskTypeDto response = taskTypeService.findTaskTypeById(id, Constants.ALIVE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createTaskType(@RequestBody TaskTypeDto dto){
        try {
            TaskType response = taskTypeService.createNewTaskType(dto);
            return new ResponseEntity<>(TaskTypeDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTaskType(@RequestBody TaskTypeDto dto){
        try {
            TaskType response = taskTypeService.updateTaskType(dto);
            return new ResponseEntity<>(TaskTypeDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTaskTypeById(@PathVariable("id") Long id){
        try {
            taskTypeService.deleteTaskType(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
