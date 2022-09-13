package com.vdc.authservice.secutity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import com.vdc.authservice.domain.Privilege;
import com.vdc.authservice.domain.Role;
import com.vdc.authservice.dto.PrivilegeDto;
import com.vdc.authservice.dto.RoleDto;
import com.vdc.authservice.dto.UserDto;
import com.vdc.authservice.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService{

    private Logger log=LoggerFactory.getLogger(UserDetailServiceImpl.class);

    private final UserService userService;

    public UserDetailServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug("Authenticating {}", username);

        try {
            // Optional<UserDto> userDto = userService.findUserByUsername(username);
            Optional<com.vdc.authservice.domain.User> user = userService.findUser(username);
            
            if(!user.isPresent()){
                throw new UsernameNotFoundException("User not found: " + username);
            }
        return user.map(u -> createSecurityUser(u)).get();
        } catch (Exception e) {
            //TODO: handle exception
            e.printStackTrace();
        }
        return null;
    }
    
    private User createSecurityUser(com.vdc.authservice.domain.User user){
        if(!user.isActive()){
            throw new UserNotActivatedException("User "+user.getUsername()+" was not activated");
        }

        Collection<Role> roles = user.getRoles();
        List<Privilege> privileges = new ArrayList<>();
        for (Role role : roles) {
            Collection<Privilege> list = role.getPrivileges();
            privileges.addAll(list);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        for(Privilege privilege : privileges){
            authorities.add(new SimpleGrantedAuthority(privilege.getName()));
        }
        // System.out.println(authorities.toString());
        return new User(user.getUsername(), user.getPassword(), authorities);
    }
}
