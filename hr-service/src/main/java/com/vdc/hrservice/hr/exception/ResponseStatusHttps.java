package com.vdc.hrservice.hr.exception;

import org.springframework.http.HttpStatus;

public class ResponseStatusHttps extends Exception {
    private static final long serialVersionUID = 1L;

	public final String message;
	public final HttpStatus status;

	public ResponseStatusHttps(String message, HttpStatus status) {
		super();
		this.message = message;
		this.status = status;
	}
}
