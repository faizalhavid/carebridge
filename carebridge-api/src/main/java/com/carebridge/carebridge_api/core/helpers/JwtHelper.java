package com.carebridge.carebridge_api.core.helpers;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import javax.crypto.SecretKey;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class JwtHelper {

    @Value("${jwt.secret}")
    private final SecretKey secretKey = Jwts.SIG.HS256.key().build();

    public String generateToken(String email, Long userId, Long expirationTime) {
        var now = Instant.now();
        return Jwts.builder()
                .claims()
                .subject(email)
                .add("user_id", userId)
                .and()
                .expiration(Date.from(now.plus(expirationTime, ChronoUnit.MILLIS)))
                .signWith(secretKey)
                .compact();
    }
    public String extractUsername(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getSubject();
    }
    public Long extractUserId(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("user_id", Long.class);
    }
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
    private boolean isTokenExpired(String token) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String expireToken(String token) {
        Claims claims = Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload();
        claims.keySet().forEach(key -> {
            if (key.equals("exp")) {
                claims.put(key, new Date());
            }
        });
        return Jwts.builder()
                .claims(claims)
                .signWith(secretKey)
                .compact();
    }
}
