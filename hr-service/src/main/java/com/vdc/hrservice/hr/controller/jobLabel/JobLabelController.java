package com.vdc.hrservice.hr.controller.jobLabel;

import java.util.List;

import com.vdc.hrservice.hr.dto.jobLabelDto.JobLabelDto;
import com.vdc.hrservice.hr.service.jobLabel.JobLabelService;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobLabel")
public class JobLabelController {
    @Autowired
    private JobLabelService jobLabelService;

    @GetMapping("/all")
    public ResponseEntity<?> getListJobLabel(){
        try {
            List<JobLabelDto> lstJobLabel = jobLabelService.findAllJobLabel();
            return new ResponseEntity<>(lstJobLabel, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{groupJobLabelId}")
    public ResponseEntity<?> getListJobLabelByGroupJobLabelId(@PathVariable("groupJobLabelId") Long groupJobLabelId){
        try {
            List<JobLabelDto> lstJobLabel = jobLabelService.findJobLabelByGroupJobLabelId(groupJobLabelId);
            return new ResponseEntity<>(lstJobLabel, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createJobLabel(@RequestBody JobLabelDto dto){
        try {
            JobLabelDto response = jobLabelService.addJobLabel(dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateJobLabel(@PathVariable("id") Long id, @RequestBody JobLabelDto dto){
        try {
            JobLabelDto response = jobLabelService.updateJobLabel(id, dto);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(e.getCause().getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteJobLabel(@PathVariable("id") Long id){
        Integer count = jobLabelService.deleteJobLabel(id);
        if (count > 0) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
