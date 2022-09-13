package com.vdc.hrservice.hr.controller.target;

import java.util.List;

import com.vdc.hrservice.config.Constants;
import com.vdc.hrservice.hr.domain.target.TargetLibrary;
import com.vdc.hrservice.hr.dto.targetDto.TargetLibrarytDto;
import com.vdc.hrservice.hr.service.target.TargetLibraryService;

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
@RequestMapping("/api/targetLibrary")
public class TargetLibraryController {
    @Autowired
    private TargetLibraryService targetLibraryService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllTargetLiBrary(){
        try {
            List<TargetLibrarytDto> lstTargetLibrarytDtos = targetLibraryService.getListTargetLibrary(Constants.ALIVE);
            return new ResponseEntity<List<TargetLibrarytDto>>(lstTargetLibrarytDtos, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getTargetLibraryById(@PathVariable("id") Long id){
        try {
            TargetLibrarytDto targetLibrarytDto = targetLibraryService.getTargetLibraryById(id, Constants.ALIVE);
            return new ResponseEntity<TargetLibrarytDto>(targetLibrarytDto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<TargetLibrarytDto> createTargetLibrary(@RequestBody TargetLibrarytDto dto){
        try {
            TargetLibrarytDto responseTargetLibrarytDto = targetLibraryService.createTargetLibrary(dto);
            return new ResponseEntity<TargetLibrarytDto>(responseTargetLibrarytDto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            System.out.println(e.getCause().getMessage());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TargetLibrarytDto> updateTargetLibrary(@PathVariable("id") Long id, @RequestBody TargetLibrarytDto dto){
        try {
            TargetLibrarytDto responseTargetLibrarytDto = targetLibraryService.updateTargetLibrary(id, dto);
            return new ResponseEntity<TargetLibrarytDto>(responseTargetLibrarytDto, HttpStatus.OK);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTargetLibrary(@PathVariable("id") Long id , @RequestBody TargetLibrarytDto dto){
        try {
            targetLibraryService.deleteTargetLibrary(id, dto);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            //TODO: handle exception
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
