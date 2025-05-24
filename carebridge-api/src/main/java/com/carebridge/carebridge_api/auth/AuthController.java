package com.carebridge.carebridge_api.auth;

import com.carebridge.carebridge_api.auth.dto.requests.*;
import com.carebridge.carebridge_api.auth.dto.responses.LoginResponse;
import com.carebridge.carebridge_api.auth.services.AuthService;
import com.carebridge.carebridge_api.core.exceptions.BadRequestException;
import com.carebridge.carebridge_api.core.responses.SuccessResponse;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/${env.api.version}/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {
    @Autowired
    private AuthService authService;

    @Value("${credentials.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse<?, Object>> loginController(
            @Valid @RequestBody LoginRequest loginRequestDto)
            throws MessagingException, IOException {
        LoginResponse loginResponse = authService.loginService(loginRequestDto);
        ResponseCookie refreshTokenCookie = createRefreshTokenCookie(loginResponse.getRefreshToken());
        loginResponse.setRefreshToken(null); // Remove refresh token from response body for security reasons
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(new SuccessResponse<>(loginResponse, "Login successful", 200));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<SuccessResponse<?, Object>> forgotPasswordController(
            @Valid @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity
                .ok(new SuccessResponse<>(
                        authService.sendMailForgotPassword(sendEmailRequest.getEmail()),
                        "Forgot password successful", 200));
    }

    @PostMapping("/change-password")
    public ResponseEntity<SuccessResponse<?, Object>> changePasswordController(
            @Valid @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.sendMailChangePassword(sendEmailRequest.getEmail()), "Change password successful", 200));
    }

    @PostMapping("/change-email")
    public ResponseEntity<SuccessResponse<?, Object>> changeEmailController(
            @Valid @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity.ok(new SuccessResponse<>(authService.sendMailChangeUserMail(sendEmailRequest.getEmail()), "Change email successful", 200));
    }

    @PostMapping("/register-email")
    public ResponseEntity<SuccessResponse<?, Object>> registerEmailController(
            @Valid @RequestBody SendEmailRequest sendEmailRequest) throws MessagingException, IOException {
        return ResponseEntity
                .ok(new SuccessResponse<>(authService.sendMailRegisterAccount(sendEmailRequest.getEmail()),
                        "Register email successful", 200));
    }

    @PostMapping("/verify-token-otp")
    public ResponseEntity<SuccessResponse<?, Object>> verifyTokenOtpController(
            @Valid @RequestBody VerifyTokenOtpRequest verifyTokenRequest) {
        authService.verifyTokenOTPService(verifyTokenRequest);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Verify token OTP successful", 200));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<SuccessResponse<?, Object>> resetPasswordController(
            @Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        authService.resetPasswordService(resetPasswordRequest);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Reset password successful", 200));
    }

    @PostMapping("/reset-email")
    public ResponseEntity<SuccessResponse<?, Object>> changeEmailAddressController(
            @Valid @RequestBody ChangeEmailRequest changeEmailRequest) {
        authService.changeEmailService(changeEmailRequest);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Change email address successful", 200));
    }

    @PostMapping("/register-account")
    public ResponseEntity<SuccessResponse<?, Object>> registerAccountController(
            @Valid @RequestBody RegisterAccountRequest registerAccountRequest)
            throws MessagingException, IOException {
        return ResponseEntity
                .ok(new SuccessResponse<>(authService.registerAccountService(registerAccountRequest),
                        "Register account successful", 200));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<SuccessResponse<?, Object>> refreshTokenController(
            @CookieValue(name = "refreshToken", required = false) String refreshToken)
            throws BadRequestException {

        Map<String, String> newToken = authService.refreshToken(refreshToken);
        ResponseCookie refreshTokenCookie = createRefreshTokenCookie(newToken.get("refresh_token"));

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body(new SuccessResponse<>(newToken.get("access_token"), "Refresh token successful",
                        200));
    }

    private ResponseCookie createRefreshTokenCookie(String refreshToken) {
        return ResponseCookie.from("refreshToken", refreshToken)
                .httpOnly(true)
                .secure(true) // set to true in production (requires HTTPS)
                .path("/")
                .maxAge(refreshTokenExpiration / 1000) // convert ms to seconds
                .sameSite("Strict")
                .build();
    }

    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse<?, Object>> logoutController(
            @RequestHeader("Authorization") String token) {
        String extractedToken = token.replace("Bearer ", "");
        authService.logoutService(extractedToken);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Logout successful", 200));
    }

}