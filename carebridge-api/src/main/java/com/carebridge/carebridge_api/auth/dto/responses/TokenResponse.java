package com.carebridge.carebridge_api.auth.dto.responses;

import com.carebridge.carebridge_api.core.enums.TokenUsedFor;

import java.time.LocalDateTime;

public record TokenResponse(
        Long id,
        String email,
        Long userId,
        String token,
        LocalDateTime expiredAt,
        Boolean isExpired,
        TokenUsedFor usedFor,
        Integer attempts) {
}
