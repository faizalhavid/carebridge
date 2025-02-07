package com.carebridge.carebridge_api.auth;

import com.carebridge.carebridge_api.auth.dto.requests.LoginRequest;
import com.carebridge.carebridge_api.auth.dto.requests.RegisterAccountRequest;
import com.carebridge.carebridge_api.auth.dto.requests.ResetPasswordRequest;
import com.carebridge.carebridge_api.auth.dto.requests.VerifyTokenOtpRequest;
import com.carebridge.carebridge_api.auth.services.AuthService;
import com.carebridge.carebridge_api.core.responses.SuccessResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/${env.api.version}/auth")
@AllArgsConstructor
public class AuthController {
    final private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<?, Object>> loginController(@Valid @RequestBody LoginRequest loginRequestDto) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.loginService(loginRequestDto), "Login successful", 200));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<SuccessResponse<?, Object>> forgotPasswordController(@Valid @RequestBody String email) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.forgotPasswordEmailService(email), "Forgot password successful", 200));
    }

    @PostMapping("/register-email")
    public ResponseEntity<SuccessResponse<?, Object>> registerEmailController(@Valid @RequestBody String email) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.registerEmailService(email), "Register email successful", 200));
    }

    @PostMapping("/verify-token-otp")
    public ResponseEntity<SuccessResponse<?, Object>> verifyTokenOtpController(@Valid @RequestBody VerifyTokenOtpRequest verifyTokenRequest) {
        authService.verifyTokenOTPService(verifyTokenRequest);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Verify token OTP successful", 200));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<SuccessResponse<?, Object>> resetPasswordController(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) throws MessagingException, IOException {
        authService.resetPasswordService(resetPasswordRequest);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Reset password successful", 200));
    }

    @PostMapping("/register-account")
    public ResponseEntity<SuccessResponse<?, Object>> registerAccountController(@Valid @RequestBody RegisterAccountRequest registerAccountRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.registerAccountService(registerAccountRequest), "Register account successful", 200));
    }


}