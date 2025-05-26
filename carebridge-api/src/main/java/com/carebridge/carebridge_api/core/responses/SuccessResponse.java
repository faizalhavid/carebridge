package com.carebridge.carebridge_api.core.responses;

import com.carebridge.carebridge_api.core.validators.Views;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class SuccessResponse<T, R> {
    @JsonView(Views.Public.class)
    private String message;

    @JsonView(Views.Public.class)
    private int status;

    @JsonView(Views.Public.class)
    private T data;

    @JsonView(Views.Public.class)
    private LocalDateTime timestamp;

    public SuccessResponse(T data, String message, int status) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.timestamp = LocalDateTime.now();
    }
}