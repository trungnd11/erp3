package com.vdc.hrservice.crm.repository;

import com.vdc.hrservice.crm.domain.FormTemplate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormTemplateRepository extends JpaRepository<FormTemplate, Long> {
    
    Page<FormTemplate> findAllByNameContainingIgnoreCaseAndDelFlgIsFalse(String name, Pageable pageable);
}
