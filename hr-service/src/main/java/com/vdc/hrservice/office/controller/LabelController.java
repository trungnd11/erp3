package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Label;
import com.vdc.hrservice.office.dto.LabelDto;
import com.vdc.hrservice.office.service.LabelService;

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
@RequestMapping("/api/label")
public class LabelController {
    @Autowired
    private LabelService labelService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllLabel(){
        try {
            List<LabelDto> lstLabel = labelService.findAllLabel(Constants.ALIVE);
            return new ResponseEntity<>(lstLabel, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value="/{id}")
    public ResponseEntity<?> getLabelById(@PathVariable("id") Long id) {
        try {
            LabelDto response = labelService.findLabelById(id, Constants.ALIVE);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createLabel(@RequestBody LabelDto dto){
        try {
            Label label = labelService.createNewLabel(dto);
            return new ResponseEntity<>(LabelDto.of(label), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateLabel(LabelDto dto){
        try {
            Label label = labelService.updateLabelById(dto);
            return new ResponseEntity<>(LabelDto.of(label), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLabelById(@PathVariable("id") Long id){
        try {
            labelService.deleteLabel(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }    
}
