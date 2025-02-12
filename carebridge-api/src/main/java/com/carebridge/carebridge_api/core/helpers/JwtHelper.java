package com.carebridge.carebridge_api.core.helpers;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtHelper {

    private final String SECRET_KEY;

    public JwtHelper(@Value("${application.jwt.secret-key}") String SECRET_KEY) {
        this.SECRET_KEY = SECRET_KEY;
    }
    private SecretKey getParsedSecretKey() {
        System.out.println("Secret :" + SECRET_KEY);
        byte[] decodedKey = Base64.getDecoder().decode(SECRET_KEY);
        return new SecretKeySpec(decodedKey, 0, decodedKey.length, "HmacSHA256");
    }

    public String generateToken(String email, Long userId, int expirationTime) {
        var now = Instant.now();
        return Jwts.builder()
                .claims()
                .subject(email)
                .add("user_id", userId)
                .and()
                .expiration(Date.from(now.plus(expirationTime, ChronoUnit.MINUTES)))
                .signWith(getParsedSecretKey())
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(getParsedSecretKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public Long extractUserId(String token) {
        return Jwts.parser().verifyWith(getParsedSecretKey()).build().parseSignedClaims(token).getPayload().get("user_id",
                Long.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(getParsedSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException | ExpiredJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("JWT token validation error: " + e.getMessage());
        }
        return false;
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser().verifyWith(getParsedSecretKey()).build().parseSignedClaims(token).getPayload().getExpiration()
                .before(new Date());
    }

    public String expireToken(String token) {
        Claims claims = Jwts.parser().verifyWith(getParsedSecretKey()).build().parseSignedClaims(token).getPayload();
        claims.keySet().forEach(key -> {
            if (key.equals("exp")) {
                claims.put(key, new Date());
            }
        });
        return Jwts.builder()
                .claims(claims)
                .signWith(getParsedSecretKey())
                .compact();
    }
}
