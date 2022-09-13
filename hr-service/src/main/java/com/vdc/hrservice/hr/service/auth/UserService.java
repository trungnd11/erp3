package com.vdc.hrservice.hr.service.auth;

import java.util.Optional;
import java.util.Map;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.netflix.appinfo.InstanceInfo;
import com.netflix.discovery.EurekaClient;
import com.vdc.hrservice.auth.domain.AppUser;
import com.vdc.hrservice.auth.dto.AppUserDto;
import com.vdc.hrservice.auth.dto.UserRoleDto;
import com.vdc.hrservice.hr.repository.auth.UserRepository;
import com.vdc.hrservice.security.SecurityUtils;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplateBuilder restTemplateBuilder;

    @Autowired
    private EurekaClient client;

    public Optional<AppUserDto> getCurrentLogginUser() throws Exception {
        Optional<String> userName = SecurityUtils.getCurrentUserLogin();
        if (userName.isPresent()) {
            Optional<AppUser> user = userRepository.findByUsernameAndActiveIsTrue(userName.get());
            return user.map(AppUserDto::of);
        } else {
            throw new Exception("UnAuthorized");
        }
    }
    
    public Boolean requestCreateUser(UserRoleDto data, ServletRequest request) {
        InstanceInfo instanceInfo = client.getNextServerFromEureka("auth", false);
        String url = instanceInfo.getHomePageUrl() + "auth/api/v1/account";
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        String token = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
        HttpEntity requestPayload = new HttpEntity(data);
        RestTemplate restTemplate = restTemplateBuilder.defaultHeader(HttpHeaders.AUTHORIZATION, token).build();
        ResponseEntity response = restTemplate.exchange(url, HttpMethod.PUT, requestPayload, Map.class);

        if (response.getStatusCode() == HttpStatus.OK) {
            return true;
        }
        return false;
    }
}
