package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.dto.AttachFileDto;
import com.vdc.hrservice.office.service.AttachFileService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/attachFile")
public class AttachFileController {
    @Autowired
    private AttachFileService attachFileService;

    @GetMapping("/all/{taskId}")
    public ResponseEntity<?> getAllAttachFileByTaskId(@PathVariable("taskId") long taskId){
        try {
            List<AttachFileDto> lstAttachFile = attachFileService.findAllAttachFileByTaskId(taskId, Constants.ALIVE);
            return new ResponseEntity<>(lstAttachFile, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAttachFile(@PathVariable("id") Long id){
        try {
            attachFileService.deleteAttachFile(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
