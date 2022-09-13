package com.vdc.hrservice.office.service.notice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vdc.hrservice.office.domain.notice.Notice;
import com.vdc.hrservice.office.dto.notice.NoticeDto;
import com.vdc.hrservice.office.repository.notice.NoticeRepository;

@Service
public class NoticeService {
	
	@Autowired
	private NoticeRepository noticeRepo;
	
	public NoticeDto createNotice(NoticeDto noticeBody) {
		Notice notice = Notice.of(noticeBody);
		Notice noticeRs = noticeRepo.save(notice);
		return NoticeDto.of(noticeRs);
	}
}
