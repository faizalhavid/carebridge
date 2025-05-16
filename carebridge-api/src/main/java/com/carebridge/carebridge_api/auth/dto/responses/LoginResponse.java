package com.carebridge.carebridge_api.auth.dto.responses;

import com.carebridge.carebridge_api.user.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private User user;
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
}
