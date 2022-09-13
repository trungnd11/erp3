package com.vdc.hrservice.office.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.office.dto.TaskTypeDto;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.Data;

@Data
@Entity
@Table(name="office_task_type")
public class TaskType extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name", nullable = true)
    private String name;

    @OneToMany(mappedBy = "taskType",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Task> tasks;

    public static TaskType of(TaskTypeDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        return mapper.map(dto, TaskType.class);
    }
}
