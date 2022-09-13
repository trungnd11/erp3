package com.vdc.hrservice.office.repository.notice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vdc.hrservice.office.domain.notice.Notice;


@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

}
