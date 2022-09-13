package com.vdc.authservice.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.vdc.authservice.config.Constants;
import com.vdc.authservice.domain.Role;
import com.vdc.authservice.domain.User;
import com.vdc.authservice.dto.RegisterUserDto;
import com.vdc.authservice.dto.RoleDto;
import com.vdc.authservice.dto.UserChangePasswordDto;
import com.vdc.authservice.dto.UserDto;
import com.vdc.authservice.dto.UserRoleDto;
import com.vdc.authservice.dto.UserDto.UserAuthoritiesDto;
import com.vdc.authservice.repository.AccountRepository;
import com.vdc.authservice.repository.RoleRepository;
import com.vdc.authservice.repository.UserRepository;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final AccountRepository accountRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository, AccountRepository accountRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.accountRepository = accountRepository;
    }

    public Optional<UserDto> findUserByUsername(String username) {
        return userRepository.findByUsernameAndActiveIsTrue(username).map(UserDto::of);
    }

    public Optional<User> findUser(String username) {
        return userRepository.findByUsernameAndActiveIsTrue(username);
    }

    public UserAuthoritiesDto getAccountWithAuthorities(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByUsernameAndActiveIsTrue(username);
        if (!user.isPresent()) {
            throw new UsernameNotFoundException("user " + username + " not found");
        }

        UserAuthoritiesDto dto = user.map(UserAuthoritiesDto::of).get();
        return dto;
    }

    public UserDto createUser(UserDto userDto) {
        String password = passwordEncoder.encode("123");
        userDto.setPassword(password);
        User user = userRepository.save(User.of(userDto));
        return UserDto.of(user);
    }

    @Transactional(rollbackFor = Exception.class)
    public UserDto saveUser(UserRoleDto userRoleDto) throws Exception {
        Optional<User> user = userRepository.findByUsernameAndActiveIsTrue(userRoleDto.getUsername());
        if (user.isPresent()) {
            User target = user.get();
            List<Role> roles = roleRepository.findByIdIn(userRoleDto.getRoleIds());
            target.setRoles(roles);
            target = userRepository.save(target);
            return UserDto.of(target);
        }
        else {
            throw new Exception("User not found");
        }
    }

    public UserDto registerAccount(RegisterUserDto userDto){
        User user = accountRepository.createUser(userDto);
        return UserDto.of(user);
    }

    public UserDto changePassword(UserChangePasswordDto dto, String username) throws Exception{

        User user = userRepository.findByUsernameAndActiveIsTrue(username).orElseThrow(()-> new Exception("user not found"));
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        user = userRepository.save(user);

        return UserDto.of(user);
    }

    public Boolean resetPassword(String username) throws Exception{
        User user = userRepository.findByUsernameAndActiveIsTrue(username).orElseThrow(()-> new Exception("user not found"));
        user.setPassword(passwordEncoder.encode(Constants.defaultPassword));
        user = userRepository.save(user);

        return true;
    }


    @Transactional(rollbackFor = Exception.class)
    public Boolean changeActiveStatus(String username) throws Exception{
        User user = userRepository.findByUsernameAndActiveIsTrue(username).orElseThrow(()-> new Exception("user not found"));
        Boolean active = user.isActive();
        user.setActive(!active);
        user = userRepository.save(user);
        return !active;
    }
}