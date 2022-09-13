package com.vdc.authservice.domain;

import java.util.Collection;
import java.util.Set;

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

import javax.validation.constraints.NotNull;

import com.vdc.authservice.dto.RoleDto;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="app_role")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "code", nullable = false)
    private String code;

    @ManyToMany(mappedBy = "roles")
    private Collection<User> users;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="role_privilege", joinColumns = {@JoinColumn(name="role_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name="privilege_id", referencedColumnName = "id")})
    @Fetch(FetchMode.SUBSELECT)
    private Collection<Privilege> privileges;

    public static Role of(RoleDto roleDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(roleDto, Role.class);
    }

    public Role(String name) {
        this.name = name;
    }
}
