package com.carebridge.carebridge_api.auth.services;

import com.carebridge.carebridge_api.auth.dto.requests.LoginRequest;
import com.carebridge.carebridge_api.auth.dto.requests.RegisterAccountRequest;
import com.carebridge.carebridge_api.auth.dto.responses.LoginResponse;
import com.carebridge.carebridge_api.auth.dto.responses.RegisterAccountResponse;
import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import com.carebridge.carebridge_api.auth.models.Token;
import com.carebridge.carebridge_api.auth.repositories.TokenRepository;
import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
import com.carebridge.carebridge_api.core.helpers.JwtHelper;
import com.carebridge.carebridge_api.core.utils.SenderMail;
import com.carebridge.carebridge_api.user.dto.projections.RoleProjection;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.carebridge.carebridge_api.user.models.Role;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.BiodataRepository;
import com.carebridge.carebridge_api.user.repositories.RoleRepository;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import jakarta.mail.MessagingException;
import lombok.AllArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@AllArgsConstructor
public class AuthService {
    final private UserRepository userRepository;
    final private TokenRepository tokenRepository;
    final private RoleRepository roleRepository;
    final private BiodataRepository biodataRepository;
    final private PasswordEncoder passwordEncoder;
    final private AuthenticationManager authenticationManager;
    final private ModelMapper modelMapper;
    final private SenderMail senderMail;
    final private JwtHelper jwtHelper = new JwtHelper();

    @Value("${jwt.expiration-access-token}")
    private Long accessTokenExpiration;

    @Value("${jwt.expiration-refresh-token}")
    private Long refreshTokenExpiration;

    final private long TIME_EXPIRED_TOKEN = 5;
    final private long TIME_RESEND_TOKEN = 180;
    final private int MAX_LOGIN_ATTEMPT = 3;

    public LoginResponse login(LoginRequest loginRequest) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeleteFalse(loginRequest.getEmail());
        LoginResponse loginResponse = new LoginResponse();
        if (user.getIsLocked()) {
            throw new RuntimeException("User is locked");
        }

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            user.setLoginAttempt(user.getLoginAttempt() + 1);
            if (user.getLoginAttempt() >= MAX_LOGIN_ATTEMPT) {
                user.setIsLocked(true);
            }
            userRepository.save(user);
            throw new RuntimeException("Invalid password");
        }

        if (user.getDeviceInfos().stream().noneMatch(deviceInfo -> deviceInfo.getDeviceToken().equals(loginRequest.getDeviceInfo().getDeviceToken()))) {
            DeviceInfo newDevice = modelMapper.map(loginRequest.getDeviceInfo(), DeviceInfo.class);
            user.getDeviceInfos().add(newDevice);
            userRepository.save(user);
            Map<String, String> mailContent = Map.of(
                    "subject", "New Device Login",
                    "message", STR."New device login from \{loginRequest.getDeviceInfo().getDeviceType()} \{loginRequest.getDeviceInfo().getOperatingSystem()} \{loginRequest.getDeviceInfo().getDeviceToken()}",
                    "additional_component", "<p style='color: red;font-weight: bold;'>If you did not login from this device, please contact us immediately or change your password</p>"
            );
            senderMail.sendMail(user.getEmail(), mailContent);
        }
        user.setLoginAttempt(0);
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        String accessToken = jwtHelper.generateToken(user.getEmail(), user.getId(), accessTokenExpiration);
        String refreshToken = jwtHelper.generateToken(user.getEmail(), user.getId(), refreshTokenExpiration);
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        loginResponse.setAccessToken(accessToken);
        loginResponse.setRefreshToken(refreshToken);
        loginResponse.setUser(user);
        loginResponse.setRole(user.getRole());
        return loginResponse;
    }

    public LocalDateTime registerEmail(String email) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeleteFalse(email);
        if (user.getIsActive()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already registered");

        Optional<Token> existingToken = tokenRepository.findTokenJustCreatedByEmailAndUsedFor(email, TokenUsedFor.REGISTRATION.toString());
        if (existingToken.isPresent() && LocalDateTime.now().isBefore(existingToken.get().getExpiredAt())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A verification token has already been sent. Please check your email.");
        }

        Token tokenOtp = generateTokenOtp(email, TokenUsedFor.REGISTRATION, user);

        Map<String, String> mailContext = Map.of(
                "subject", "Email Verification",
                "message", STR."<p>Thanks for your interest in joining CareBridge! To complete your registration, we need you to verify your email address. Use the code below to verify your email.</p><p class=\"message\">The code above is only valid for <span class=\"highlight-text\">\{tokenOtp.getExpiredAt().minusMinutes(LocalDateTime.now().getMinute()).getMinute()} minutes</span>.</p>"
                "additional_component", STR."<h1 class='otp'>\{tokenOtp.getToken()}</h1>"
        );


        senderMail.sendMail(email, mailContext);
        return tokenOtp.getExpiredAt();
    }

    public void verifyTokenOTP(String token, String email, TokenUsedFor usedFor) {
        Token tokenOtp = tokenRepository.findTokenByTokenAndEmailAndUsedFor(token, email, usedFor.toString())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token"));
        if (tokenOtp.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }
        User user = userRepository.findByEmailAndIsDeleteFalse(email);
        user.setIsActive(true);
        userRepository.save(user);
        tokenOtp.setIsExpired(true);
        tokenOtp.setExpiredAt(LocalDateTime.now());
        tokenRepository.save(tokenOtp);
    }

    public RegisterAccountResponse registerAccount(RegisterAccountRequest registerAccountRequest) {
        User user = userRepository.findByEmailAndIsDeleteFalse(registerAccountRequest.getEmail());
        Biodata biodata = modelMapper.map(registerAccountRequest, Biodata.class);
        RegisterAccountResponse registerAccountResponse = new RegisterAccountResponse();
        if (!user.getIsActive()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not verified");
        RoleProjection checkRole = roleRepository.findRoleByCode("ROLE_CUSTOMER");
        if (checkRole == null) throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Role not found");
        user.setRole(modelMapper.map(checkRole, Role.class));
        user.setPassword(passwordEncoder.encode(registerAccountRequest.getPassword()));
        user.setBiodata(biodata);
        userRepository.save(user);
        biodataRepository.save(biodata);
        registerAccountResponse.setUser(user);

        return registerAccountResponse;

    }

    public void forgotPasswordEmail(String email) throws MessagingException, IOException {
        User user = userRepository.findByEmailAndIsDeleteFalse(email);
        if (!user.getIsActive()) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not verified");
        Token tokenOtp = generateTokenOtp(email, TokenUsedFor.FORGOT_PASSWORD, user);
        Map<String, String> mailContext = Map.of(
                "subject", "Forgot Password",
                "message", STR."<p>Forgot your password? Don't worry, we got you covered! Use the code below to reset your password.</p><p class=\"message\">The code above is only valid for <span class=\"highlight-text\">\{tokenOtp.getExpiredAt().minusMinutes(LocalDateTime.now().getMinute()).getMinute()} minutes</span>.</p>",
                "additional_component", STR."<h1 class='otp'>\{tokenOtp.getToken()}</h1>"
        );
        senderMail.sendMail(email, mailContext);
    }

    public void resetPassword(String token, String email, String password) {
        Token tokenOtp = tokenRepository.findTokenByTokenAndEmailAndUsedFor(token, email, TokenUsedFor.FORGOT_PASSWORD.toString())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid token"));
        if (tokenOtp.getExpiredAt().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token has expired");
        }
        User user = userRepository.findByEmailAndIsDeleteFalse(email);
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        tokenOtp.setIsExpired(true);
        tokenOtp.setExpiredAt(LocalDateTime.now());
        tokenRepository.save(tokenOtp);
    }

    public void logout(String token) {
        Token tokenUser = tokenRepository.findTokenByTokenAndUsedFor(token, TokenUsedFor.AUTHENTICATION.toString())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token not found"));
        tokenUser.setIsExpired(true);
        tokenUser.setExpiredAt(LocalDateTime.now());
        tokenRepository.save(tokenUser);
    }
    private Token generateTokenOtp(String email, TokenUsedFor usedFor, User user) throws BadRequestException {
        Optional<Token> tokenJustCreated = tokenRepository.findTokenJustCreatedByEmailAndUsedFor(email,
                usedFor.toString());
        if (tokenJustCreated.isPresent()) {
            Token existingToken = tokenJustCreated.get();
            if (LocalDateTime.now().isBefore(existingToken.getCreatedAt().plusSeconds(TIME_RESEND_TOKEN))) {
                throw new BadRequestException(STR."Token already sent. Please wait for \{TIME_RESEND_TOKEN} seconds before requesting a new token.");
            }
            existingToken.setExpiredAt(LocalDateTime.now());
            existingToken.setIsExpired(true);
            tokenRepository.save(existingToken);
        }
        Token tokenOtp = new Token();
        tokenOtp.setToken(String.format("%06d", new Random().nextInt(999999)));
        tokenOtp.setEmail(email);
        tokenOtp.setUsedFor(usedFor);
        tokenOtp.setExpiredAt(LocalDateTime.now().plusMinutes(TIME_EXPIRED_TOKEN));
        // tokenOtp.setModifiedOn(LocalDateTime.now());
        if (user != null) {
            tokenOtp.setUserId(user.getId());
        }

        tokenRepository.save(tokenOtp);
        return tokenOtp;
    }

}
