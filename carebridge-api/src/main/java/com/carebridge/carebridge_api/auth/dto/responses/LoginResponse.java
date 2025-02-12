package com.carebridge.carebridge_api.auth.dto.responses;


import com.carebridge.carebridge_api.auth.models.Token;
import com.carebridge.carebridge_api.user.models.Role;
import com.carebridge.carebridge_api.user.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private LocalDateTime expiredAt;
    private User user;
}
