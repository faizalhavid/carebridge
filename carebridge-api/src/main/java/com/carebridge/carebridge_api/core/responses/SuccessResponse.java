package com.carebridge.carebridge_api.core.responses;


import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class SuccessResponse<T> {
    private String message;
    private int status;
    private T data;
    private LocalDateTime timestamp;

    // constructor for pagination
    public SuccessResponse(T data, String message, int status) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }
}

