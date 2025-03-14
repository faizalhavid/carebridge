package com.carebridge.carebridge_api.auth.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClaimTokenResponse {
    private String accessToken;
    private String refreshToken;
}
