package com.vdc.hrservice.hr.controller.employee;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.common.HttpResponse;
import com.vdc.hrservice.hr.dto.employee.PositionDto;
import com.vdc.hrservice.hr.service.employee.PositionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping(path = "/api/v1/position")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @GetMapping(value = "")
    public ResponseEntity<?> getPostion(Pageable pageable, @RequestParam(name = "key") String key) {
        try {
            Page<PositionDto> page = positionService.findPostion(key, pageable);
            return ResponseEntity.ok().body(page);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @PostMapping(path = "")
    public ResponseEntity<?> createPosition(@RequestBody PositionDto dto) {
        try {
            PositionDto positionDto = positionService.savePosition(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<>(positionDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }
    

    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getPositionId(@PathVariable(name = "id") Long id) {
        try {
            Optional<PositionDto> position = positionService.getPositionById(id);
            if (position.isPresent()) {
                return ResponseEntity.ok().body(new HttpResponse<>(position.get()));
            }
            return ResponseEntity.badRequest().body(new HttpResponse<>("Position not found"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updatePosition(@PathVariable(name = "id") Long id, @RequestBody PositionDto positionDto) {
        try {
            PositionDto updatePosition = positionService.updatePosition(id, positionDto);
            return ResponseEntity.ok().body(new HttpResponse<>(updatePosition));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllPosition(){
        try {
            List<PositionDto> positionEmp = positionService.getAll();
            return ResponseEntity.ok().body(positionEmp);
        } catch (Exception e) {
            //TODO: handle exception
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

}
