package com.vdc.hrservice.office.controller;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.office.domain.Evaluation;
import com.vdc.hrservice.office.dto.EvaluationDto;
import com.vdc.hrservice.office.service.EvaluationService;

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
@RequestMapping("/api/evaluation")
public class EvaluationController {
    @Autowired
    private EvaluationService evaluationService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllEvaluation(){
        try {
            List<EvaluationDto> lstEvaluation = evaluationService.findAllEvaluation(Constants.ALIVE);
            return new ResponseEntity<>(lstEvaluation, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getEvaluationById(@PathVariable("id") Long id){
        try {
            EvaluationDto dto = evaluationService.findEvaluationById(id, Constants.ALIVE);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEvaluation(@RequestBody EvaluationDto dto){
        try {
            Evaluation response = evaluationService.createNewEvaluation(dto);
            return new ResponseEntity<>(EvaluationDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateEvaluation(@RequestBody EvaluationDto dto){
        try {
            Evaluation response = evaluationService.updateEvaluation(dto);
            return new ResponseEntity<>(EvaluationDto.of(response), HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEvaluationById(@PathVariable("id") Long id){
        try {
            evaluationService.deleteEvaluationById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
