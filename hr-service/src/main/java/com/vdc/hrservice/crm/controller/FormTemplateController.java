package com.vdc.hrservice.crm.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import com.vdc.hrservice.common.HttpResponse;
import com.vdc.hrservice.crm.dto.FormTemplateDto;
import com.vdc.hrservice.crm.service.FormTemplateService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping(path = "/api/v1/form-data")
public class FormTemplateController {
    
    @Autowired
    private FormTemplateService formTemplateService;

    @GetMapping(path = "")
    public ResponseEntity<?> getMethodName(@RequestParam(name = "key", required = false) String key,
            Pageable pageable) {
        try {
            if (key != null) {
                Page<FormTemplateDto> page = formTemplateService.getFormTemplateByKey(pageable, key);
                return ResponseEntity.ok().body(new HttpResponse<>(page));
            } else {
                List<FormTemplateDto> templateDtos = formTemplateService.getAll();
                return ResponseEntity.ok().body(new HttpResponse<>(templateDtos));
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }
    
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getFormTemplateById(@PathVariable(name = "id") Long id) {
        try {
            Optional<FormTemplateDto> templateDto = formTemplateService.getFormTemplateById(id);
            if (!templateDto.isPresent()) {
                return ResponseEntity.badRequest().body(new HttpResponse<>("Form data not found from server!"));
            }
            return ResponseEntity.ok().body(new HttpResponse<>(templateDto.get()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping(path = "")
    public ResponseEntity<?> createFormTemplate(@RequestBody FormTemplateDto formTemplateDto) {
        try {
            FormTemplateDto templateDto = formTemplateService.save(formTemplateDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new HttpResponse<>(templateDto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<?> updateFormTemplate(@PathVariable(name = "id") Long id, @RequestBody FormTemplateDto formTemplateDto) {
        try {
            FormTemplateDto templateDto = formTemplateService.save(formTemplateDto);
            templateDto.setId(id);
            return ResponseEntity.status(HttpStatus.CREATED).body(templateDto);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }
    
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteFormTemplate(@PathVariable(name = "id") Long id) {
        try {
            formTemplateService.deleteFormById(id);
            return ResponseEntity.ok().body(new HttpResponse<>("Delete form successfully!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new HttpResponse<>(e.getMessage()));
        }
    }

}
