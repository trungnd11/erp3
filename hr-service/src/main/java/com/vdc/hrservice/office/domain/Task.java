package com.vdc.hrservice.office.domain;

import java.time.Duration;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.office.dto.TaskDto;
import com.vdc.hrservice.office.dto.TaskDto.BasicTaskDto;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "office_task")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Task extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "task_name" , nullable = false)
    private String taskName;

    @Column(name = "task_no", nullable =  false)
    private String taskNo;

    @Column(name = "type_duration", nullable = true)
    private String typeDuration;

    @Column(name = "expected_start", nullable = true)
    private ZonedDateTime expectedStart;

    @Column(name = "expected_ending", nullable = true)
    private ZonedDateTime expectedEnding;

    @Column(name = "start_day", nullable = true)
    private ZonedDateTime startDay;

    @Column(name="finish_day", nullable = true)
    private ZonedDateTime finishDay;

    @Lob
    @Column(name = "description", nullable = true , length = 10000)
    private String description;

    @Column(name="parrent", nullable = true)
    private Long parrent;

    @Column(name = "progress" , nullable = true)
    private Double progress;

    @Column(name = "weight", nullable = true)
    private Integer weight;

    @Column(name = "calculationMethod", nullable = true)
    private Integer calculationMethod;
    
    @OneToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "employee_id")
    private Employee reporter;

    @ManyToMany(fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SUBSELECT)
    @JoinTable(name = "office_task_assignee",
              joinColumns = {@JoinColumn(name = "task_id", referencedColumnName = "id")},
              inverseJoinColumns = {@JoinColumn(name = "employee_id" , referencedColumnName = "id")})
    private List<Employee> lstAssignee;

    @ManyToMany(fetch = FetchType.LAZY)
    @Fetch(value = FetchMode.SUBSELECT)
    @JoinTable(name = "office_task_watcher",
              joinColumns = {@JoinColumn(name = "task_id", referencedColumnName = "id")},
              inverseJoinColumns = {@JoinColumn(name = "employee_id" , referencedColumnName = "id")})
    private List<Employee> lstWatcher;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "task_id")
    @JsonIgnore
    private List<AttachFile> files;

    @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Work> lstWorks;

    @ManyToOne(fetch= FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "status_id")
    private Status status;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne(fetch= FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "label_id")
    private Label label;

    @ManyToOne(fetch= FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "priority_id")
    private Priority priority;

    @ManyToOne(fetch= FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "task_type_id")
    private TaskType taskType;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "sprint_id")
    private Sprint sprint;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "office_task_hash_tag",
              joinColumns = {@JoinColumn(name = "task_id", referencedColumnName = "id")},
              inverseJoinColumns = {@JoinColumn(name = "hash_tag_id" , referencedColumnName = "id")})
    private List<HashTag> tags;

    public void setStartDayConvert(String startDay){
        this.startDay = DateUtils.convertShort2Zone(startDay);
    }

    public void setFinishDayConvert(String finishDay){
        this.finishDay = DateUtils.convertShort2Zone(finishDay);
    }

    public static Task of(TaskDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        Task task = mapper.map(dto, Task.class);
        task.setStartDayConvert(dto.getStartDay());
        task.setFinishDayConvert(dto.getFinishDay());
        return task;
    }

    public static Task convert(BasicTaskDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        Task task = mapper.map(dto, Task.class);
        return task;
    }

}
