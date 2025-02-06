package com.carebridge.carebridge_api.core.helpers;

import com.carebridge.carebridge_api.auth.repositories.TokenRepository;
import com.carebridge.carebridge_api.core.responses.ErrorResponse;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import liquibase.command.CommandOverride;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;



@Component
@AllArgsConstructor
public class TokenAuthFilter extends OncePerRequestFilter {
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final List<String> PUBLIC_URLS = List.of("/api/auth/login", "/api/auth/forgot-password", "/api/auth/verify-token-otp", "/api/auth/reset-password");


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String authHeader = request.getHeader("Authorization");
            String token = null, username = null;
            JwtHelper jwtHelper = new JwtHelper();
            // Bypass token validation for login endpoint
            if (PUBLIC_URLS.contains(request.getRequestURI())) {
                filterChain.doFilter(request, response);
                return;
            }

            System.out.println("Auth Header: " + authHeader);
            if (authHeader != null && authHeader.startsWith("Bearer ")){
                token = authHeader.substring(7);
                username = jwtHelper.extractUsername(token);
            }

            if(token == null) {
                filterChain.doFilter(request, response);
                return;
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                if (jwtHelper.validateToken(token, userDetails)) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                }
            }
        } catch (AccessDeniedException e){
            System.out.println("Access Denied : " + e.getMessage());
            ErrorResponse apiResponse = new ErrorResponse("Access Denied", "You are not authorized to access this resource", null, LocalDateTime.now());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write(apiResponse.toString());
        }


    }
}
