package com.carebridge.carebridge_api.auth.dto.responses;

import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private UserProjection user;
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
}
