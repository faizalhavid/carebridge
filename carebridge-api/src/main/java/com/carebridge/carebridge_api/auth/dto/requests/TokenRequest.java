package com.carebridge.carebridge_api.auth.dto.requests;

import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenRequest {

    @Email(message = "Email should be valid")
    @Size(max = 100, message = "Email cannot exceed 100 characters")
    private String email;

    private Long userId;

    @NotBlank(message = "Token is required")
    @Size(max = 500, message = "Token cannot exceed 500 characters")
    private String token;

    private LocalDateTime expiredAt;

    private Boolean isExpired = false;

    @NotNull(message = "Token usage type is required")
    private TokenUsedFor usedFor;

    private Integer attempts = 0;

}
