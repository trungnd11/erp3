package com.vdc.hrservice.auth.domain;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.vdc.hrservice.auth.dto.PrivilegeDto;

import org.modelmapper.ModelMapper;

import lombok.Data;

@Entity
@Table(name = "app_privilege")
@Data
public class Privilege {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="description", unique = true, nullable = false)
    private String description;

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "privileges")
    private Collection<AppRole> roles;

    public static Privilege of(PrivilegeDto privilegeDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(privilegeDto, Privilege.class);
    }
}
