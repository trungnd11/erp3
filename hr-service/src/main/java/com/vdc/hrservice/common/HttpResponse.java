package com.vdc.hrservice.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HttpResponse<T> {
    private String message = "Successfully!";
    private T data;

    public HttpResponse(String message) {
        this.message = message;
    }

    public HttpResponse(T data){
        this.data = data;
    }
}
