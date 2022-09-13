package com.vdc.hrservice.office.controller.noctice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vdc.hrservice.office.dto.notice.NoticeDto;
import com.vdc.hrservice.office.service.notice.NoticeService;

@RestController
@RequestMapping("/api/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService noticeService;
	
	@PostMapping("/create")
	public ResponseEntity<?> createNotice(@RequestBody NoticeDto noticeBody) {
		try {
			NoticeDto rs = noticeService.createNotice(noticeBody);
			return new ResponseEntity<>(rs,HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
