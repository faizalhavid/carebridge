package com.carebridge.carebridge_api.core.helpers;

import com.carebridge.carebridge_api.auth.services.ImplUserDetailService;
import com.carebridge.carebridge_api.core.responses.ErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
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
public class TokenAuthFilter extends OncePerRequestFilter {
    private final ImplUserDetailService userDetailsService;
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
            JwtHelper jwtHelper = new JwtHelper();
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
        } catch (AccessDeniedException e) {
            System.out.println("Access Denied : " + e.getMessage());
            ErrorResponse apiResponse = new ErrorResponse("Access Denied",
                    "You are not authorized to access this resource", null, LocalDateTime.now());
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.getWriter().write(apiResponse.toString());
        }
    }
}