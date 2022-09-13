package com.vdc.authservice.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.vdc.authservice.domain.User;
import com.vdc.authservice.dto.RegisterUserDto;
import com.vdc.authservice.dto.Response;
import com.vdc.authservice.dto.UserChangePasswordDto;
import com.vdc.authservice.dto.UserDto;
import com.vdc.authservice.dto.UserRoleDto;
import com.vdc.authservice.dto.UserDto.UserAuthoritiesDto;
import com.vdc.authservice.secutity.SecurityUtils;
import com.vdc.authservice.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1")
public class UserAccount {

    @Autowired
    private UserService userService;
    
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping(path = "/authenticate/account")
    public ResponseEntity<?> getAccount() {
        try {
            String username = SecurityUtils.getCurrentUserLogin();
            UserAuthoritiesDto dto = userService.getAccountWithAuthorities(username);
            return ResponseEntity.ok().body(new Response<UserAuthoritiesDto>(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PostMapping(path = "/account")
    public ResponseEntity<?> createAccount(@RequestBody UserDto userDto) {
        try {
            UserDto account = userService.createUser(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response<UserDto>(account));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PutMapping(path = "/account")
    public ResponseEntity<?> updateUser(@RequestBody UserRoleDto payload) {
        try {
            UserDto dto = userService.saveUser(payload);
            return ResponseEntity.ok().body(new Response<UserDto>(dto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PostMapping(value="/account/create")
    public ResponseEntity<?> createUser(@RequestBody RegisterUserDto userDto) {
        try {
            UserDto user = userService.registerAccount(userDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response<UserDto>(user));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping(value="/account/change-password/{username}")
    public ResponseEntity<?> changePassword(@PathVariable(name = "username") String username, @RequestBody UserChangePasswordDto body) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, body.getPassword()));
            UserDto userDto = userService.changePassword(body, username);
            return ResponseEntity.ok().body(new Response<>(userDto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PutMapping(value="/account/reset-password/{username}")
    public ResponseEntity<?> resetPassword(@PathVariable(name = "username") String username) {
        try {
            Boolean updated = userService.resetPassword(username);
            return ResponseEntity.ok().body(new Response<>("Reset password successlly!"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

    @PutMapping(value="/account/active/{username}")
    public ResponseEntity<?> changeActiveStatus(@PathVariable(name = "username") String username) {
        try {

            Boolean active = userService.changeActiveStatus(username);
            return ResponseEntity.ok().body(new Response<Boolean>(active));
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new Response<>(e.getMessage()));
        }
    }

}
