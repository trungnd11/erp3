package com.vdc.hrservice.hr.controller.employee;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;

import lombok.Data;

@Entity
@Table(name = "group_notice")
@Data
public class GroupNotice extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="name", length = 255, nullable = false)
    private String name;

    @Column(name="descriptions")
    private String descriptions;
}
