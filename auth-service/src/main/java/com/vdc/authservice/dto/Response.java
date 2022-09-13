package com.vdc.authservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class Response<T> {
    private String message = "Successfully!";
    private T data;

    public Response (String message){
        this.message = message;
    }

    public Response (T data){
        this.data = data;
        this.message = "Successfully!";
    }
}
