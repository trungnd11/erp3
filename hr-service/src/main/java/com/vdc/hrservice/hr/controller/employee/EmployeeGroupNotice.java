package com.vdc.hrservice.hr.controller.employee;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.domain.employee.Employee;

import org.hibernate.annotations.Generated;

import lombok.Data;

@Entity
@Table(name = "employee_group_notice")
@Data
public class EmployeeGroupNotice extends AbstractAuditingEntity{
    
    @EmbeddedId
    private EmployeeGroupKey id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("groupId")
    @JoinColumn(name = "group_id")
    private GroupNotice group;

    @Column(name="role")
    private String role;
}
