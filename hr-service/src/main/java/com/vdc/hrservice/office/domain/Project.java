package com.vdc.hrservice.office.domain;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.common.DateUtils;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.office.dto.ProjectDto;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@Entity
@Table(name="office_project")
public class Project extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_name" , nullable = false)
    private String projectName;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "privacy", nullable = false)
    private String privacy;

    @Column(name = "dead_line", nullable = false)
    private ZonedDateTime deadLine;

    @Column(name = "year")
    private String year;

    @Column(name="project_status", nullable =  true)
    private String projectStatus;

    @OneToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "attach_file_id")
    private AttachFile thumnailImage;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "office_project_employee",
              joinColumns = {@JoinColumn(name = "project_id", referencedColumnName = "id")},
              inverseJoinColumns = {@JoinColumn(name = "employee_id" , referencedColumnName = "id")})
    private List<Employee> lstMember;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "office_project_hash_tag",
              joinColumns = {@JoinColumn(name = "project_id", referencedColumnName = "id")},
              inverseJoinColumns = {@JoinColumn(name = "hash_tag_id" , referencedColumnName = "id")})
    private List<HashTag> tags;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Status> status;

    @OneToOne(fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    @JoinColumn(name = "employee_id")
    private Employee teamLead;

    @OneToMany(mappedBy = "project",cascade = CascadeType.ALL , orphanRemoval = true)
    @JsonIgnore
    private List<Task> tasks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Sprint> sprints;

    public void setDeadLineConvert(String deadLine){
        this.deadLine = DateUtils.convertShort2Zone(deadLine);
    }

    @Override
    public boolean equals(Object o){
        if (this == o) {
            return true;
        } 
        if(!(o instanceof Project)){
            return false;
        }
        return privacy != null && privacy.equals(((Project) o).privacy);
    }

    public static Project of(ProjectDto dto){
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STANDARD)
                                 .setSkipNullEnabled(true);
        Project project = mapper.map(dto, Project.class);
        project.setDeadLineConvert(dto.getDeadLine());
        return project;
    }


}
