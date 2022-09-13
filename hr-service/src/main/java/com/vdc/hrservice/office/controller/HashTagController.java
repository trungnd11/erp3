package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.HashTag;
import com.vdc.hrservice.office.dto.HashTagDto;
import com.vdc.hrservice.office.service.HashTagService;

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
@RequestMapping("/api/hashTag")
public class HashTagController {
    @Autowired
    private HashTagService hashTagService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllHashTag(){
        try {
            List<HashTagDto> hashTags = hashTagService.findAllByDelFlg(Constants.ALIVE);
            return new ResponseEntity<>(hashTags, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> getHashTagsByProjectId(@PathVariable("projectId") Long projectId){
        try {
            List<HashTagDto> hashTags = hashTagService.findHashTagByProjectIdAndDelFlg(projectId, Constants.ALIVE);
            return new ResponseEntity<>(hashTags, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createHashTag(@RequestBody HashTagDto dto){
        try {
            HashTagDto hashTag = hashTagService.createNewHashTag(dto);
            return new ResponseEntity<>(hashTag, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateHashTag(@RequestBody HashTagDto dto){
        try {
            HashTagDto hashTag = hashTagService.updateHashTag(dto);
            return new ResponseEntity<>(hashTag, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHashTag(@PathVariable("id") Long id){
        try {
            hashTagService.deleteHashTag(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
