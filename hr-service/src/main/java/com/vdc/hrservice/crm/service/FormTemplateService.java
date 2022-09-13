package com.vdc.hrservice.crm.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.hrservice.crm.domain.FormTemplate;
import com.vdc.hrservice.crm.dto.FormTemplateDto;
import com.vdc.hrservice.crm.repository.FormTemplateRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class FormTemplateService {
    
    @Autowired
    private FormTemplateRepository templateRepository;

    public FormTemplateDto save(FormTemplateDto templateDto) {
        FormTemplate formTemplate = FormTemplate.of(templateDto);
        formTemplate = templateRepository.save(formTemplate);
        return FormTemplateDto.of(formTemplate);
    }

    public Page<FormTemplateDto> getFormTemplateByKey(Pageable pageable, String key) {
        System.out.println("sevice "+ key);
        Page<FormTemplate> page = templateRepository.findAllByNameContainingIgnoreCaseAndDelFlgIsFalse(key, pageable);
        return page.map(FormTemplateDto::of);
    }

    public List<FormTemplateDto> getAll() {
        List<FormTemplateDto> formTemplateDtos = templateRepository.findAll().stream().map(FormTemplateDto::of)
                .collect(Collectors.toList());
        return formTemplateDtos;
    }

    public Optional<FormTemplateDto> getFormTemplateById(Long id) {
        Optional<FormTemplate> formTemplate = templateRepository.findById(id);
        return formTemplate.map(FormTemplateDto::of);
    }

    public void deleteFormById(Long id) {
        FormTemplate formTemplate = templateRepository.getById(id);
        formTemplate.setDelFlg(true);
        templateRepository.save(formTemplate);
    }
    
}
