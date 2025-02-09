package com.carebridge.carebridge_api.auth.services;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.UserRepository;

@Service
public class ImplUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;

    public ImplUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        User user = userRepository.findByEmailAndIsDeleteFalse(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No user found"));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(user.getRole().getCode())
                .build();
    }

}