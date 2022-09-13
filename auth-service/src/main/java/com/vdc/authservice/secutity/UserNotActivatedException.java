package com.vdc.authservice.secutity;

import org.springframework.security.core.AuthenticationException;

public class UserNotActivatedException extends AuthenticationException{

    public UserNotActivatedException(String msg) {
        super(msg);
    }
    public UserNotActivatedException(String message, Throwable t) {
        super(message, t);
    }
}
