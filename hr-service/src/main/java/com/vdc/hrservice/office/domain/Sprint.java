package com.vdc.hrservice.office.domain;

import java.time.ZonedDateTime;
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
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.office.dto.SprintDto;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.Data;

@Data
@Entity
@Table(name = "office_sprint")
public class Sprint extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sprint_name", nullable = false)
    private String sprintName;

    @Column(name = "start_day", nullable = false)
    private ZonedDateTime startDay;

    @Column(name = "finish_day", nullable = false)
    private ZonedDateTime finishDay;

    @Column(name = "type_sprint")
    private String typeSprint;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "project_id")
    private Project project;

    @OneToMany(mappedBy = "sprint",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Task> tasks;

    public static Sprint of(SprintDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        return mapper.map(dto, Sprint.class);
    }

}
