package com.carebridge.carebridge_api.auth.dto.responses;

import com.carebridge.carebridge_api.core.validators.Views;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.models.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonView(Views.Public.class)
public class LoginResponse {
    private User user;
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
}
