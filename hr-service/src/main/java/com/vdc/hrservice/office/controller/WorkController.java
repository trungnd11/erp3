package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Work;
import com.vdc.hrservice.office.dto.WorkDto;
import com.vdc.hrservice.office.service.WorkService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/work")
public class WorkController {
    @Autowired
    private WorkService workService;

    @GetMapping("/all/{taskId}")
    public ResponseEntity<?> getAllWorkByTaskId(@PathVariable("taskId") Long taskId){
        try {
            List<WorkDto> lstWork = workService.findAllWorkByTaskId(taskId, Constants.ALIVE);
            return new ResponseEntity<>(lstWork, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create/{taskId}")
    public ResponseEntity<?> createWork(@PathVariable("projectId") Long projectId,@RequestBody WorkDto dto){
        try {
            Work reponse = workService.createNewWork(projectId, dto);
            return new ResponseEntity<>(WorkDto.of(reponse), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


    @PutMapping("/update")
    public ResponseEntity<?> updateWork(@RequestBody WorkDto dto){
        try {
            Work work = workService.updateWork(dto);
            return new ResponseEntity<>(WorkDto.of(work), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
