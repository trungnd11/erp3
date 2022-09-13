package com.vdc.authservice.controller.advice;

import com.vdc.authservice.dto.Response;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;

@ControllerAdvice
public class GlobalRestControllerAdvice extends ResponseEntityExceptionHandler{
    
    @ExceptionHandler(value = {ExpiredJwtException.class, UnsupportedJwtException.class, MalformedJwtException.class, SignatureException.class})
    public ResponseEntity<?> handleJwtException(Exception ex ){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response<>(ex.getMessage()));
    }
}
