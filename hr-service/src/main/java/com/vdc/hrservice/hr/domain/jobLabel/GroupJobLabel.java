package com.vdc.hrservice.hr.domain.jobLabel;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.jobLabelDto.GroupJobLabelDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "group_job_label")
public class GroupJobLabel extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="groupName")
	private String groupName;
	
	@Column(name="group_label_library")
	private Boolean groupLabelLibrary;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "group_job_label_id")
    @JsonIgnore
    private List<JobLabel> lstJobLabel = new ArrayList<JobLabel>();

    public static GroupJobLabel of(GroupJobLabelDto dto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(dto, GroupJobLabel.class);
    }
}
