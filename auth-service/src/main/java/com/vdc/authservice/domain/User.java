package com.vdc.authservice.domain;

import java.time.Instant;
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
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.vdc.authservice.config.Constants;
import com.vdc.authservice.dto.UserDto;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="app_user")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    @NotNull
    @Column(name="username", unique = true)
    private String username;

    @NotNull
    @Size(min = 1, max = 256)
    @Column(name="password")
    private String password;

    @Column(name="active", length = 1, nullable = false)
    @ColumnDefault("0")
    private boolean active;

    @Column(name="del_flg", length = 1, nullable = false)
    @ColumnDefault("0")
    private boolean delFlg;


    @Size(min = 4, max = 10)
    @Column(name = "active_key")
    private String activeKey;
    
    @Size(max = 20)
    @Column(name="activation_key")
    private String activationKey;

    @Size(max = 20)
    @Column(name="reset_key")
    private String resetKey;

    @Column(name="reset_date")
    private Instant resetDate = null;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name="user_role", joinColumns = {@JoinColumn(name="user_id", referencedColumnName = "id")},
    inverseJoinColumns = {@JoinColumn(name="role_id", referencedColumnName = "id")})
    @Fetch(FetchMode.SUBSELECT)
    private Collection<Role> roles;

    public static User of(UserDto userDto){
        ModelMapper mapper = new ModelMapper();
        return mapper.map(userDto, User.class);
    }
}
