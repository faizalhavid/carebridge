package com.carebridge.carebridge_api.auth.dto.responses;


import com.carebridge.carebridge_api.user.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private ClaimTokenResponse token;
    private User user;
}
