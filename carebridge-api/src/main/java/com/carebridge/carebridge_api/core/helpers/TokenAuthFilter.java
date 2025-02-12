package com.carebridge.carebridge_api.core.helpers;

import com.carebridge.carebridge_api.auth.services.ImplUserDetailService;
import com.carebridge.carebridge_api.core.responses.ErrorResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Component
@AllArgsConstructor
@Slf4j
public class TokenAuthFilter extends OncePerRequestFilter {
    private final ImplUserDetailService userDetailsService;
    private final JwtHelper jwtHelper;
    private static final List<String> PUBLIC_URLS = List.of(
            "/api/v1/auth/.*",
            "/swagger-ui.html",
            "/v3/api-docs");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String authHeader = request.getHeader("Authorization");
            String token = null, username = null;
            String requestURI = request.getRequestURI();
            boolean isPublic = PUBLIC_URLS.stream()
                    .anyMatch(requestURI::matches);

            if (isPublic && !requestURI.equals("/api/v1/logout")) {
                filterChain.doFilter(request, response);
                return;
            }

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
                username = jwtHelper.extractUsername(token);
            }

            if (token != null && jwtHelper.validateToken(token)) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,
                        null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
            filterChain.doFilter(request, response);
       } catch (JwtException e) {
            log.error("Access Denied: {}", e.getMessage(), e);
            ErrorResponse<String> apiResponse = new ErrorResponse<>(
                    "fail",
                    "You are not authorized to access this resource",
                    e.getMessage(),
                    LocalDateTime.now());
            ErrorResponse<String> errorResponse = new ErrorResponse<>(
                    "fail",
                    "You are not authorized to access this resource",
                    e.getMessage(),
                    LocalDateTime.now());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//            response.setContentType("application/json");
            response.getWriter().write(convertObjectToJson(errorResponse));
        }
    }

private String convertObjectToJson(Object object) throws JsonProcessingException {
    if (object == null) {
        return null;
    }
    ObjectMapper mapper = new ObjectMapper();
    mapper.registerModule(new JavaTimeModule());
    return mapper.writeValueAsString(object);
}
}