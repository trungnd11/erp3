package com.vdc.hrservice.crm.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.crm.dto.FormTemplateDto;

import org.modelmapper.ModelMapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "form_template")
@Data
@NoArgsConstructor
public class FormTemplate extends AbstractAuditingEntity{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "descriptions", nullable = true)
    private String descriptions;

    @Column(name="template", nullable = false, length = 4000)
    private String template;

    @Column(name="value", nullable = true, length = 4000)
    private String value;

    public static FormTemplate of(FormTemplateDto template) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(template, FormTemplate.class);
    }
}
