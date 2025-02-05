package com.carebridge.carebridge_api.auth.services;

import com.carebridge.carebridge_api.auth.repositories.TokenRepository;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    final private UserRepository userRepository;
    final private TokenRepository tokenRepository;

    @Value("${env.max-login-attempts}")
    private int MAX_LOGIN_ATTEMPTS;

    @Value("${env.time-expired-token}")
    private int EXPIRED_TOKEN;

    @Value("${env.time-resend-token}")
    private int RESEND_TOKEN;

    public LoginResponse login(LoginRequest loginRequest){

    }
}
