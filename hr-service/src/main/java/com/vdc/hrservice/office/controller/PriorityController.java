package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Priority;
import com.vdc.hrservice.office.dto.PriorityDto;
import com.vdc.hrservice.office.service.PriorityService;

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
@RequestMapping("/api/priority")
public class PriorityController {
    @Autowired
    private PriorityService priorityService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllPriority(){
        try {
           List<PriorityDto> lstPriority = priorityService.findAllPriority(Constants.ALIVE);
           return new ResponseEntity<>(lstPriority, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPriorityById(@PathVariable("id") Long id){
        try {
            PriorityDto response = priorityService.findPriorityById(id, Constants.ALIVE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPriority(@RequestBody PriorityDto dto){
        try {
            Priority response = priorityService.createNewPriority(dto);
            return new ResponseEntity<>(PriorityDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updatePriority(@RequestBody PriorityDto dto){
        try {
            Priority response = priorityService.updatePriority(dto);
            return new ResponseEntity<>(PriorityDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePriority(@PathVariable("id") Long id){
        try {
            priorityService.deletePriority(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
