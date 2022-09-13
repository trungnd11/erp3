package com.vdc.authservice.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vdc.authservice.domain.User;

import org.modelmapper.ModelMapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable{
    private Long id;

    private String username;

    private String password;

    private boolean active;

    private boolean delFlg;

    private Collection<RoleDto> roles;

    public static UserDto of(User user){
        ModelMapper mapper = new ModelMapper();
        UserDto dto = mapper.map(user, UserDto.class);
        System.out.println(dto.toString());
        return dto;
    }

    @Data
    @Builder
    @ToString
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserAuthoritiesDto implements Serializable{
        private Long id;

        private String username;

        private boolean active;

        private boolean delFlg;

        @JsonIgnore
        private Collection<RoleDto> roles;
        
        private List<String> authorities;

        public static UserAuthoritiesDto of(User user){
            ModelMapper mapper = new ModelMapper();
            UserAuthoritiesDto dto = mapper.map(user, UserAuthoritiesDto.class);

            List<String> authorities = new ArrayList<>();
            for (RoleDto roleDto : dto.getRoles()) {
                for (PrivilegeDto priDto : roleDto.getPrivileges()) {
                    authorities.add(priDto.getName());
                }
            }
            dto.setAuthorities(authorities);
            return dto;
        }
    }
}