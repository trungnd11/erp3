package com.vdc.authservice.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.netflix.discovery.converters.Auto;
import com.vdc.authservice.dto.LoginVM;
import com.vdc.authservice.dto.UserDto;
import com.vdc.authservice.secutity.UserNotActivatedException;
import com.vdc.authservice.secutity.jwt.JWTFilter;
import com.vdc.authservice.secutity.jwt.TokenProvider;
import com.vdc.authservice.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Data;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping(path="/api/v1/authenticate")
public class UserJWTController {
    
    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping(path = "")
    public ResponseEntity<?> getToken(@RequestBody LoginVM loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = tokenProvider.createToken(authentication, loginRequest.isRememberMe());
            HttpHeaders headers = new HttpHeaders();
            headers.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer "+jwt);
            return new ResponseEntity<>(new JWTToken(jwt), headers, HttpStatus.OK);
        } 
        catch(UsernameNotFoundException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password!");
        }
        catch(UserNotActivatedException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account is not active");
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid username or password");
        }
    }
    
    
    @Data
    @AllArgsConstructor
    static class JWTToken {
        @JsonProperty("token")
        private String token;

    }
}
