package com.carebridge.carebridge_api.auth.services;

import com.carebridge.carebridge_api.auth.dto.requests.*;
import com.carebridge.carebridge_api.auth.dto.responses.LoginResponse;
import com.carebridge.carebridge_api.auth.dto.responses.RegisterAccountResponse;
import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import com.carebridge.carebridge_api.auth.models.Token;
import com.carebridge.carebridge_api.auth.repositories.DeviceInfoRepository;
import com.carebridge.carebridge_api.auth.repositories.TokenRepository;
import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
import com.carebridge.carebridge_api.core.exceptions.BadRequestException;
import com.carebridge.carebridge_api.core.helpers.JwtHelper;
import com.carebridge.carebridge_api.core.utils.SenderMail;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.BiodataRepository;
import com.carebridge.carebridge_api.access.repositories.RoleRepository;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import jakarta.mail.MessagingException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
//import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenRepository tokenRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BiodataRepository biodataRepository;
    @Autowired
    private DeviceInfoRepository deviceRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private SenderMail senderMail;
    // @Autowired
    // private RedisTemplate<String, Object> redisTemplate;
    @Autowired
    private JwtHelper jwtHelper;

    @Value("${credentials.refresh-token-expiration}")
    private long refreshTokenExpiration;

    @Value("${credentials.access-token-expiration}")
    private long accessTokenExpiration;

    final private int TIME_EXPIRED_TOKEN = 5;
    final private int TIME_RESEND_TOKEN = 180;
    final private int MAX_LOGIN_ATTEMPT = 3;

    public LoginResponse loginService(LoginRequest loginRequest) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeletedFalse(loginRequest.getEmail())
                .orElseThrow(() -> new BadRequestException("general", "No user found"));
        LoginResponse loginResponse = new LoginResponse();
        if (user.getIsLocked()) {
            throw new BadRequestException("general", "User is locked");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            user.setLoginAttempt(user.getLoginAttempt() + 1);
            if (user.getLoginAttempt() >= MAX_LOGIN_ATTEMPT) {
                user.setIsLocked(true);
            }
            userRepository.save(user);
            throw new BadRequestException("password", "Invalid password");
        }

        if (user.getDeviceInfos().stream().noneMatch(
                deviceInfo -> deviceInfo.getDeviceToken()
                        .equals(loginRequest.getDeviceInfo().getDeviceToken()))) {
            DeviceInfo newDevice = modelMapper.map(loginRequest.getDeviceInfo(), DeviceInfo.class);
            newDevice.setUser(user); // Ensure the user is set
            user.getDeviceInfos().add(newDevice);
            userRepository.save(user);
            Map<String, String> mailContent = Map.of(
                    "subject", "New Device Login",
                    "message",
                    "New device login from " + loginRequest.getDeviceInfo().getDeviceType() + " "
                            + loginRequest.getDeviceInfo().getOperatingSystem() + " "
                            + loginRequest.getDeviceInfo().getDeviceToken(),
                    "additional_component",
                    "<p style='color: red;font-weight: bold;'>If you did not login from this device, please contact us immediately or change your password</p>");
            // senderMail.sendMail(user.getEmail(), mailContent);
        }
        user.setLoginAttempt(0);
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        String accessToken = jwtHelper.generateToken(user.getEmail(), user.getId(), accessTokenExpiration);
        String refreshToken = jwtHelper.generateToken(user.getEmail(), user.getId(), refreshTokenExpiration);
        // redisTemplate.opsForValue().set("refresh_token:" + user.getId(),
        // refreshToken, refreshTokenExpiration, TimeUnit.MILLISECONDS);
        // TODO - REDIS DELETE THIS
        Token token = new Token();
        token.setToken(refreshToken);
        token.setUserId(user.getId());
        token.setUsedFor(TokenUsedFor.REFRESH_TOKEN);

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        loginResponse.setAccessToken(accessToken);
        loginResponse.setRefreshToken(refreshToken);
        loginResponse.setUser(user);
        return loginResponse;
    }

    public LocalDateTime sendMailRegisterAccount(String email) throws MessagingException, IOException {
        Optional<User> user = userRepository.findByEmailAndIsDeletedFalse(email);
        if (user.isPresent())
            throw new BadRequestException("general", "User already verified");

        Optional<Token> existingToken = tokenRepository.findTokenJustCreatedByEmailAndUsedFor(email,
                TokenUsedFor.REGISTRATION);
        if (existingToken.isPresent() && LocalDateTime.now().isBefore(existingToken.get().getExpiredAt())) {
            throw new BadRequestException("general",
                    "Token already sent. Please wait for " + TIME_RESEND_TOKEN
                            + " seconds before requesting a new token.");
        }

        Token tokenOtp = generateTokenOtp(email, TokenUsedFor.REGISTRATION, user);
        long minutesLeft = ChronoUnit.MINUTES.between(LocalDateTime.now(), tokenOtp.getExpiredAt());
        Map<String, String> mailContext = Map.of(
                "subject", "Email Verification",
                "message",
                "<p>Thanks for your interest in joining CareBridge! To complete your registration, we need you to verify your email address. Use the code below to verify your email.</p><p class=\"message\">The code above is only valid for <span class=\"highlight-text\">"
                        + minutesLeft + " minutes</span>.</p>",
                "additional_component", "<h1 class='otp'>" + tokenOtp.getToken() + "</h1>");
        // senderMail.sendMail(email, mailContext);
        return tokenOtp.getExpiredAt();
    }

    public LocalDateTime sendMailForgotPassword(String email) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found"));

        Token tokenOtp = generateTokenOtp(email, TokenUsedFor.FORGOT_PASSWORD, Optional.of(user));
        long minutesLeft = ChronoUnit.MINUTES.between(LocalDateTime.now(), tokenOtp.getExpiredAt());
        Map<String, String> mailContext = Map.of(
                "subject", "Forgot Password",
                "message",
                "<p>Forgot your password? Don't worry, we got you covered! Use the code below to reset your password.</p><p class=\"message\">The code above is only valid for <span class=\"highlight-text\">"
                        + minutesLeft + " minutes</span>.</p>",
                "additional_component", "<h1 class='otp'>" + tokenOtp.getToken() + "</h1>");
        senderMail.sendMail(email, mailContext);
        return tokenOtp.getExpiredAt();
    }

    public LocalDateTime sendMailChangePassword(String email) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found"));

        Token tokenOtp = generateTokenOtp(email, TokenUsedFor.CHANGE_PASSWORD, Optional.of(user));
        long minutesLeft = ChronoUnit.MINUTES.between(LocalDateTime.now(), tokenOtp.getExpiredAt());
        Map<String, String> mailContext = Map.of(
                "subject", "Change Password",
                "message",
                "<p>Change your password? Use the code below to change your password.</p><p class=\"message\">The code above is only valid for <span class=\"highlight-text\">"
                        + minutesLeft + " minutes</span>.</p>",
                "additional_component", "<h1 class='otp'>" + tokenOtp.getToken() + "</h1>");
        senderMail.sendMail(email, mailContext);
        return tokenOtp.getExpiredAt();
    }

    public LocalDateTime sendMailChangeUserMail(String email) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeletedFalse(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found"));

        Token token = generateTokenOtp(email, TokenUsedFor.CHANGE_EMAIL, Optional.of(user));
        long minutesLeft = ChronoUnit.MINUTES.between(LocalDateTime.now(), token.getExpiredAt());
        Map<String, String> mailContext = Map.of(
                "subject", "Change Email",
                "message",
                "<p>Change your email? Use the code below to change your email.</p><p class=\"message\">The code above is only valid for <span class=\"highlight-text\">"
                        + minutesLeft + " minutes</span>.</p>",
                "additional_component", "<h1 class='otp'>" + token.getToken() + "</h1>");

        senderMail.sendMail(email, mailContext);
        return token.getExpiredAt();
    }

    public void verifyTokenOTPService(VerifyTokenOtpRequest verifyTokenOtpRequest) {
        TokenUsedFor usedForEnum = TokenUsedFor.fromString(verifyTokenOtpRequest.getUsedFor());
        Token tokenOtp = tokenRepository
                .findTokenByTokenAndEmailAndUsedFor(verifyTokenOtpRequest.getToken(),
                        verifyTokenOtpRequest.getEmail(),
                        usedForEnum)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid token"));

        if (tokenOtp.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }

        if (tokenOtp.getAttempts() >= 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Token has been blocked due to too many failed attempts.");
        }

        if (!tokenOtp.getToken().equals(verifyTokenOtpRequest.getToken())) {
            tokenOtp.setAttempts(tokenOtp.getAttempts() + 1);
            tokenRepository.save(tokenOtp);
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        }

        User user = new User();
        user.setEmail(tokenOtp.getEmail());
        userRepository.save(user);
        tokenOtp.setUserId(user.getId());
        tokenRepository.save(tokenOtp);
    }

    public void resetPasswordService(ResetPasswordRequest resetPasswordRequest) {
        User user = userRepository.findByEmailAndIsDeletedFalse(resetPasswordRequest.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found"));

        Token token = tokenRepository
                .findTokenByTokenAndEmailAndUsedFor(resetPasswordRequest.getToken(), resetPasswordRequest.getEmail(),
                        TokenUsedFor.fromString(resetPasswordRequest.getUsedFor()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid token"));

        if (token.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }
        if (!token.getToken().equals(resetPasswordRequest.getToken())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password does not match");
        }

        if (token.getUsedFor() == TokenUsedFor.CHANGE_PASSWORD && resetPasswordRequest.getOldPassword() != null) {
            if (!passwordEncoder.matches(resetPasswordRequest.getOldPassword(), user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Old password is incorrect");
            }
            if (!passwordEncoder.matches(resetPasswordRequest.getNewPassword(), user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "New password cannot be the same as old password");
            }
        }

        // Reset password
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getNewPassword()));
        userRepository.save(user);

        token.setIsExpired(true);
        token.setExpiredAt(LocalDateTime.now());
        tokenRepository.save(token);
    }

    public void changeEmailService(ChangeEmailRequest changeEmailRequest) {
        User user = userRepository.findByEmailAndIsDeletedFalse(changeEmailRequest.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found"));

        Token token = tokenRepository
                .findTokenByTokenAndEmailAndUsedFor(changeEmailRequest.getToken(), changeEmailRequest.getEmail(),
                        TokenUsedFor.CHANGE_EMAIL)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid token"));

        if (token.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }
        if (!token.getToken().equals(changeEmailRequest.getToken())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token");
        }

        // Change email
        user.setEmail(changeEmailRequest.getNewEmail());
        userRepository.save(user);

        token.setIsExpired(true);
        token.setExpiredAt(LocalDateTime.now());
        tokenRepository.save(token);
    }

    public RegisterAccountResponse registerAccountService(RegisterAccountRequest registerAccountRequest) {
        Token token = tokenRepository
                .findFirstByTokenAndUsedForOrderByCreatedAtDesc(registerAccountRequest.getToken(),
                        TokenUsedFor.REGISTRATION)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid token"));
        if (token.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }

        User user = userRepository.findByEmailAndIsDeletedFalse(token.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "User not found"));

        Role role = roleRepository.findFirstByCode("ROLE_CUSTOMER")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Role not found"));
        user.getRoles().add(role);
        if (!registerAccountRequest.getPassword().equals(registerAccountRequest.getConfirmPassword()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Password does not match");
        user.setPassword(passwordEncoder.encode(registerAccountRequest.getPassword()));

        Biodata biodata = modelMapper.map(registerAccountRequest, Biodata.class);
        biodataRepository.save(biodata);
        user.setBiodata(biodata);
        userRepository.save(user);

        return new RegisterAccountResponse(user);
    }


    public void logoutService(String token) {
        // redisTemplate.delete("refresh_token:" + jwtHelper.extractUserId(token));
        Token tokenUser = tokenRepository
                .findTokenByTokenAndUsedFor(token, TokenUsedFor.REFRESH_TOKEN.toString())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Invalid token"));
        tokenUser.setIsExpired(true);
        tokenUser.setExpiredAt(LocalDateTime.now());
        tokenUser.setDeleteAt(LocalDateTime.now());
        tokenUser.setIsDeleted(true);
        tokenRepository.save(tokenUser);
    }

    public Map<String, String> refreshToken(String refreshToken) throws BadRequestException {
        if (refreshToken == null || !jwtHelper.validateToken(refreshToken)) {
            throw new BadRequestException("token", "Invalid or missing refresh token");
        }
        Long userId = jwtHelper.extractUserId(refreshToken);
        String userEmail = jwtHelper.extractUsername(refreshToken);

        String newAccessToken = jwtHelper.generateToken(userEmail, userId, refreshTokenExpiration);
        String newRefreshToken = jwtHelper.generateToken(userEmail, userId, refreshTokenExpiration);

        return Map.of(
                "access_token", newAccessToken,
                "refresh_token", newRefreshToken);
    }

    private Token generateTokenOtp(String email, TokenUsedFor usedFor, Optional<User> user)
            throws BadRequestException {
        Optional<Token> tokenJustCreated = tokenRepository.findTokenJustCreatedByEmailAndUsedFor(email,
                usedFor);
        if (tokenJustCreated.isPresent()) {
            Token existingToken = tokenJustCreated.get();
            if (LocalDateTime.now().isBefore(existingToken.getCreatedAt().plusSeconds(TIME_RESEND_TOKEN))) {
                throw new BadRequestException("general",
                        "Token already sent. Please wait for " + TIME_RESEND_TOKEN
                                + " seconds before requesting a new token.");
            }
            existingToken.setExpiredAt(ChronoUnit.MINUTES.addTo(LocalDateTime.now(), TIME_EXPIRED_TOKEN));
            existingToken.setIsExpired(false);
            tokenRepository.save(existingToken);
        }
        Token tokenOtp = new Token();
        tokenOtp.setToken(new SecureRandom().ints(0, 10)
                .limit(6)
                .mapToObj(Integer::toString)
                .collect(Collectors.joining()));
        tokenOtp.setEmail(email);
        tokenOtp.setUsedFor(usedFor);
        tokenOtp.setExpiredAt(LocalDateTime.now().plusMinutes(TIME_EXPIRED_TOKEN));
        if (user.isPresent()) {
            tokenOtp.setUserId(user.get().getId());
        }

        tokenRepository.save(tokenOtp);
        return tokenOtp;
    }

}
