package com.carebridge.carebridge_api.core.responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse<T> {
    private String status;
    private String message;
    private T errors;
    private LocalDateTime timestamp;
}
