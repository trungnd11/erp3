package com.vdc.hrservice.hr.domain.jobLabel;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.jobLabelDto.JobLabelDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Data
@Entity
@Table(name = "job_label")
public class JobLabel extends AbstractAuditingEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="label_name")
	private String labelName;
	
	@Column(name="color_code")
	private String colorCode;
	
	@ManyToOne
	@JoinColumn(name="group_job_label_id")
	private GroupJobLabel  groupJobLabel;

	public static JobLabel of(JobLabelDto dto){
		ModelMapper mapper = new ModelMapper();
		return mapper.map(dto, JobLabel.class);
	}
}
