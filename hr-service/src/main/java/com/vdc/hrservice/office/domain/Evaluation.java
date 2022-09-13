package com.vdc.hrservice.office.domain;

import java.time.ZonedDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.office.dto.EvaluationDto;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.Data;

@Data
@Entity
@Table(name="office_evaluation")
public class Evaluation extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "percent_complete", nullable = true)
    private Integer percentComplete;

    @Column(name = "quality", nullable = true)
    private String quality;

    @Column(name = "time_complete", nullable = true)
    private ZonedDateTime timeComplete;
    
    @OneToOne( fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    private Task task;

    public static Evaluation of(EvaluationDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        Evaluation evaluation = mapper.map(dto, Evaluation.class);
        return evaluation;
    }
}
