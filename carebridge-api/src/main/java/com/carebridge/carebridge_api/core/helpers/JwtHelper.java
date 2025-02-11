package com.carebridge.carebridge_api.core.helpers;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.SecretKey;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor
public class JwtHelper {

    @Value("${jwt.secret}")
    private String secret;

    private SecretKey getSecretKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(String email, Long userId, int expirationTime) {
        var now = Instant.now();
        return Jwts.builder()
                .claims()
                .subject(email)
                .add("user_id", userId)
                .and()
                .expiration(Date.from(now.plus(expirationTime, ChronoUnit.MILLIS)))
                .signWith(getSecretKey())
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload().getSubject();
    }

    public Long extractUserId(String token) {
        return Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload().get("user_id",
                Long.class);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(getSecretKey()).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException | ExpiredJwtException e) {
            System.out.println("Invalid JWT token: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("JWT token validation error: " + e.getMessage());
        }
        return false;
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload().getExpiration()
                .before(new Date());
    }

    public String expireToken(String token) {
        Claims claims = Jwts.parser().verifyWith(getSecretKey()).build().parseSignedClaims(token).getPayload();
        claims.keySet().forEach(key -> {
            if (key.equals("exp")) {
                claims.put(key, new Date());
            }
        });
        return Jwts.builder()
                .claims(claims)
                .signWith(getSecretKey())
                .compact();
    }
}
