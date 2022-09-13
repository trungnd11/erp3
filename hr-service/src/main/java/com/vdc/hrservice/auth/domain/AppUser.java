package com.vdc.hrservice.auth.domain;

import java.time.Instant;
import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.vdc.hrservice.auth.dto.AppUserDto;
import com.vdc.hrservice.hr.domain.employee.Employee;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

@Entity
@Table(name = "app_user")
@Data
@NoArgsConstructor
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 1, max = 50)
    @NotNull
    @Column(name = "username", unique = true)
    private String username;

    @NotNull
    @Size(min = 1, max = 256)
    @Column(name = "password")
    private String password;

    @Column(name = "active", length = 1, nullable = false)
    @ColumnDefault("0")
    private boolean active;

    @Column(name = "del_flg", length = 1, nullable = false)
    @ColumnDefault("0")
    private boolean delFlg;

    @Size(max = 20)
    @Column(name = "activation_key")
    private String activationKey;

    @Size(min = 4, max = 10)
    @Column(name = "active_key")
    private String activeKey;

    @Column(name = "actived_at")
    private Instant activedAt;

    @Size(max = 20)
    @Column(name = "reset_key")
    private String resetKey;

    @Column(name = "reset_date")
    private Instant resetDate = null;
    
    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @ToString.Exclude
    private Employee employee;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role", joinColumns = {
            @JoinColumn(name = "user_id", referencedColumnName = "id") }, inverseJoinColumns = {
                    @JoinColumn(name = "role_id", referencedColumnName = "id") })
    @Fetch(FetchMode.SUBSELECT)
    @ToString.Exclude
    private Collection<AppRole> roles;

    public static AppUser of(AppUserDto userDto) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(userDto, AppUser.class);
    }

    public AppUser(String username, String password, boolean active, Employee employee){
        this.username = username;
        this.password = password;
        this.active = active;
        this.employee = employee;
    }
}
