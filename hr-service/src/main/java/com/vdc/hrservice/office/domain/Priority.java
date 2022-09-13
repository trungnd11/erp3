package com.vdc.hrservice.office.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.office.dto.PriorityDto;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.Data;

@Data
@Entity
@Table(name="office_priority")
public class Priority extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name" , nullable = true)
    private String name;

    @Column(name = "color", nullable = true)
    private String color;

    public static Priority of(PriorityDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        Priority priority = mapper.map(dto, Priority.class);
        return priority;
    }
}
