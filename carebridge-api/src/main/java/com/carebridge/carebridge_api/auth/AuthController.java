package com.carebridge.carebridge_api.auth;

import com.carebridge.carebridge_api.auth.dto.requests.*;
import com.carebridge.carebridge_api.auth.services.AuthService;
import com.carebridge.carebridge_api.core.exceptions.BadRequestException;
import com.carebridge.carebridge_api.core.responses.SuccessResponse;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/${env.api.version}/auth")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    final private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<?, Object>> loginController(@Valid @RequestBody LoginRequest loginRequestDto) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.loginService(loginRequestDto), "Login successful", 200));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<SuccessResponse<?, Object>> forgotPasswordController(@Valid @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.forgotPasswordEmailService(sendEmailRequest.getEmail()), "Forgot password successful", 200));
    }

    @PostMapping("/register-email")
    public ResponseEntity<SuccessResponse<?, Object>> registerEmailController(@Valid @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.registerEmailService(sendEmailRequest.getEmail()), "Register email successful", 200));
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

    @PostMapping("refresh-token")
    public ResponseEntity<SuccessResponse<?, Object>> refreshTokenController(@Valid @RequestBody String accessToken) throws BadRequestException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.refreshToken(accessToken), "Refresh token successful", 200));
    }


}