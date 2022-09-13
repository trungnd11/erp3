package com.vdc.hrservice.auth.dto;

import java.time.Instant;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.vdc.hrservice.auth.domain.AppRole;
import com.vdc.hrservice.auth.domain.AppUser;
import com.vdc.hrservice.hr.dto.employee.EmployeeDto;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUserDto {
    private Long id;

    private String username;

    @JsonIgnore
    private String password;

    private boolean active;

    private boolean delFlg;

    private String activationKey;

    private String resetKey;
    
    private Instant resetDate;

    @ToString.Exclude
    private Collection<AppRoleDto> roles;
    
    @ToString.Exclude
    private EmployeeDto employee;

    public static AppUserDto of(AppUser appUser) {
        ModelMapper mapper = new ModelMapper();
        return mapper.map(appUser, AppUserDto.class);
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserDto{
        private Long id;

        private String username;

        private boolean active;

        private Instant activedAt;

        @ToString.Exclude
        private Collection<AppRoleDto> roles;

        public static UserDto of(AppUser appUser) {
            ModelMapper mapper = new ModelMapper();
            return mapper.map(appUser, UserDto.class);
        }
    }
}
