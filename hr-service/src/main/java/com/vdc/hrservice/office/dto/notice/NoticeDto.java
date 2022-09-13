package com.vdc.hrservice.office.dto.notice;

import org.modelmapper.ModelMapper;

import com.vdc.hrservice.hr.dto.employee.EmployeeDto;
import com.vdc.hrservice.office.domain.notice.Notice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeDto {
	private Long id;
	private String notice;
	private EmployeeDto employee;
	
	public static NoticeDto of(Notice notice) {
		ModelMapper mapper = new ModelMapper();
		return mapper.map(notice, NoticeDto.class);
	}
}
