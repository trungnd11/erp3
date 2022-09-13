package com.vdc.hrservice.crm.dto;

import com.vdc.hrservice.crm.domain.FormTemplate;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FormTemplateDto {

    private Long id;

    private String name;

    private String descriptions;

    private String template;

    private String value;

    public static FormTemplateDto of(FormTemplate template){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(template, FormTemplateDto.class);
    }
}
