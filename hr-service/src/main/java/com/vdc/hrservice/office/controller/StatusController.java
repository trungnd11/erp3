package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Status;
import com.vdc.hrservice.office.dto.StatusDto;
import com.vdc.hrservice.office.service.StatusService;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/status")
public class StatusController {
    @Autowired
    private StatusService statusService;


    @GetMapping("/all/{projectId}")
    public ResponseEntity<?> getAllStatusByProjectId(@PathVariable("projectId") Long projectId){
        try {
            List<StatusDto> lstStatus = statusService.findStatusByProjectId(projectId, Constants.ALIVE);
            return new ResponseEntity<>(lstStatus, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStatusById(@PathVariable("id") Long id){
        try {
            StatusDto res = statusService.findStatusById(id, Constants.ALIVE);
            return new ResponseEntity<>(res, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create/{projectId}")
    public ResponseEntity<?> createNewStatus(@PathVariable("projectId") Long projectId,@RequestBody StatusDto dto){
        try {
            Status status = statusService.createStatusByProjectId(projectId, dto);
            return new ResponseEntity<>(StatusDto.of(status), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateStatus(@RequestBody StatusDto dto){
        try {
            Status response = statusService.updateStatus(dto);
            return new ResponseEntity<>(StatusDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStatus(@PathVariable("id") Long id){
        try {
            statusService.deleteStattusById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
