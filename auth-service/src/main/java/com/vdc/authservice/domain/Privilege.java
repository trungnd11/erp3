package com.vdc.authservice.domain;

import java.util.Collection;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.vdc.authservice.dto.PrivilegeDto;

import org.modelmapper.ModelMapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "app_privilege")
@NoArgsConstructor
@Data
public class Privilege {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", unique = true)
    private String name;

    @Column(name = "description", length = 255)
    private String description;

    @ManyToMany(mappedBy = "privileges")
    private Collection<Role> roles;

    public Privilege(String name) {
        this.name = name;
    }
    
    public static Privilege of(PrivilegeDto privilegeDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(privilegeDto, Privilege.class);
    }
}
