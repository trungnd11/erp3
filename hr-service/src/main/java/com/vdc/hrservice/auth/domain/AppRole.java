package com.vdc.hrservice.auth.domain;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.vdc.hrservice.auth.dto.AppRoleDto;
import com.vdc.hrservice.hr.domain.employee.Position;

import lombok.Data;
import lombok.ToString;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

@Entity
@Table(name = "app_role")
@Data
public class AppRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "code", nullable = false, unique = true)
    private String code;

    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    private Collection<AppUser> users;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name="role_privilege", joinColumns = {@JoinColumn(name="role_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name="privilege_id", referencedColumnName = "id")})
    @Fetch(FetchMode.SUBSELECT)
    private Collection<Privilege> privileges;

    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    private Collection<Position> positions;

    public static AppRole of(AppRoleDto roleDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(roleDto, AppRole.class);
    }
}
