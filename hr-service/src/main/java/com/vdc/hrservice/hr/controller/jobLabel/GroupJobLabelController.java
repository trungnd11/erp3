package com.vdc.hrservice.hr.controller.jobLabel;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.dto.jobLabelDto.GroupJobLabelDto;
import com.vdc.hrservice.hr.service.jobLabel.GroupJobLabelService;

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
@RequestMapping("/api/groupJobLabel")
public class GroupJobLabelController {
    @Autowired
    private GroupJobLabelService groupJobLabelService;

    @GetMapping("/all")
    public ResponseEntity<List<GroupJobLabelDto>> getAllGroupJobLabel(){
        try {
            List<GroupJobLabelDto> response = groupJobLabelService.findAllGroupJobLabel();
            return new ResponseEntity<List<GroupJobLabelDto>>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/lstGroupLabel")
    public ResponseEntity<?> getAllGroupJobLabelByGroupLabelLibrary(){
        try {
            List<GroupJobLabelDto> responseGroupJobLabel = groupJobLabelService.getListGroupJobLabels(Boolean.TRUE, Constants.ALIVE);
            return new ResponseEntity<>(responseGroupJobLabel, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>( HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getGroupJobLabelById(@PathVariable("id") Long id){
        try {
            GroupJobLabelDto response = groupJobLabelService.findGroupJobLabelById(id);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
            
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createGroupJobLabel(@RequestBody GroupJobLabelDto dto) {
        try {
            GroupJobLabelDto response = groupJobLabelService.createGroupJobLabel(dto);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateGroupJobLabel(@PathVariable("id") Long id, @RequestBody GroupJobLabelDto dto){
        try {
            GroupJobLabelDto response = groupJobLabelService.updateGroupJobLabel(id, dto);
            if (response != null) {
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteGroupJobLabel(@PathVariable("id") Long id){
        try {
            groupJobLabelService.deleteGroupJobLabel(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
