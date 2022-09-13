package com.vdc.hrservice.office.domain.notice;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.modelmapper.ModelMapper;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.employee.Employee;
import com.vdc.hrservice.office.dto.notice.NoticeDto;

import lombok.Data;

@Data
@Entity
@Table(name="office_notice")
public class Notice extends AbstractAuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="notice",nullable = false)
	private String notice;
	
	@ManyToOne
	@JoinColumn(name="employee_id")
	private Employee employee;
	
	public static Notice of(NoticeDto noticeDto) {
		ModelMapper mapper = new ModelMapper();
		return mapper.map(noticeDto, Notice.class);
	}
}
