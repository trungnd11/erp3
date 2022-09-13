package com.vdc.hrservice.hr.domain.employee;

import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.hrservice.auth.domain.AppRole;
import com.vdc.hrservice.common.AbstractAuditingEntity;
import com.vdc.hrservice.hr.dto.employee.PositionDto;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table(name = "employee_position")
@Data
public class Position extends AbstractAuditingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Lob
    @Column(name="descriptions")
    private String descriptions;

    @OneToMany(mappedBy = "empPosition")
    private List<Employee> employee;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="position_role", joinColumns = {@JoinColumn(name="employee_position_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name="role_id", referencedColumnName = "id")})
    @Fetch(FetchMode.SUBSELECT)
    private Collection<AppRole> roles;

    public static Position of(PositionDto dto) {
        ModelMapper mapper = new ModelMapper();
        Position position = mapper.map(dto, Position.class);
        return position;
    }
}
