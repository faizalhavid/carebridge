package com.carebridge.carebridge_api.core.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse<T> {
    private String status;
    private String message;
    private List<ErrorDetails> errors;
    private LocalDateTime timestamp;

    public ErrorResponse(String status, String message, List<ErrorDetails> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
        this.timestamp = LocalDateTime.now();
    }
}
