package com.carebridge.carebridge_api.core.responses;


import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class SuccessResponse<T,R> {
    private String message;
    private int status;
    private T data;
}
