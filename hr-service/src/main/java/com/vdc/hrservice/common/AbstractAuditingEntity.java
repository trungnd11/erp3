package com.vdc.hrservice.common;

import java.io.Serializable;
import java.time.Instant;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

import com.vdc.hrservice.hr.utils.DateUtils;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;

import lombok.Data;

@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditingEntity implements Serializable {
    
    @CreatedBy
    @Column(name="created_by", nullable = false, length = 50, updatable = false)
    private String createdBy;

    @CreatedDate
    @Column(name="created_date", updatable = false)
    private Instant createdDate = Instant.now();

    @LastModifiedBy
    @Column(name="last_modified_by", length = 50)
    private String lastModifiedBy;

    @LastModifiedDate
    @Column(name="last_modified_date")
    private Instant lastModifiedDate = Instant.now();

    @Column(name = "del_flg")
    @ColumnDefault("0")
    private boolean delFlg;

    @Column(name = "deleter", nullable = true)
    private String deleter;

    @Column(name = "deleted", nullable = true)
    private ZonedDateTime deleted;

    public void setLogicDeletedAt() {
        this.deleter = SecurityContextHolder.getContext().getAuthentication() != null
                ? ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername()
                : null;
        this.deleted = DateUtils.now();
        this.delFlg = true;
    
    }
}
