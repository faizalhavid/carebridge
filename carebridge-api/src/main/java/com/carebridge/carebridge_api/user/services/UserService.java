package com.carebridge.carebridge_api.user.services;

import java.util.List;

import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.access.repositories.RoleRepository;
import com.carebridge.carebridge_api.admin.models.Admin;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.user.dto.projections.BiodataProjection;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import org.springframework.web.server.ResponseStatusException;

@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${credentials.default-password}")
    private String defaultPassword;

    // getAllUsers : admin, manager,medical, doctor : view
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> {
                    UserResponse response = new UserResponse();
                    response.setUser(modelMapper.map(user, UserProjection.class));
                    response.setBiodata(modelMapper.map(user.getBiodata(), BiodataProjection.class));
                    return response;
                })
                .toList();
    }

    // getUserById : admin, manager,medical, doctor : view
    public UserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    UserResponse response = new UserResponse();
                    response.setUser(modelMapper.map(user, UserProjection.class));
                    response.setBiodata(modelMapper.map(user.getBiodata(), BiodataProjection.class));
                    return response;
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // postUser : admin : create
    public UserResponse createUser(UserRequest userRequest) {
        userRepository.findByEmailAndIsDeletedFalse(userRequest.getEmail()).ifPresent(user -> {
            throw new RuntimeException("User already exists with email: " + userRequest.getEmail());
        });

        User authenticatedUser = userRepository.findById(
                        (Long) ((SecurityContext) SecurityContextHolder.getContext()).getAuthentication().getDetails())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        Admin authenticatedAdmin = authenticatedUser.getBiodata().getAdmin();
        if (userRequest.getRoles() != null && userRequest.getRoles().contains("ADMIN")) {
            int adminCount = userRepository.getNumberOfGenerateAdminUser(authenticatedUser.getId());
            if (adminCount >= 2) {
                throw new RuntimeException("Cannot create more than 2 users with ADMIN role.");
            }
            authenticatedAdmin.setMaxGenerateAdminUser(adminCount + 1);
        }

        User user = modelMapper.map(userRequest, User.class);
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(defaultPassword));
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        List<Role> roles = roleRepository.findByCodeIn(userRequest.getRoles())
                .orElse(List.of(roleRepository.findFirstByCode("ROLE_CUSTOMER")
                        .orElseThrow(() -> new RuntimeException("Default role not found: ROLE_CUSTOMER"))));

        user.setRoles(roles);
        userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setUser(modelMapper.map(user, UserProjection.class));
        response.setBiodata(modelMapper.map(user.getBiodata(), BiodataProjection.class));

        return response;
    }

    // putUser : admin : update
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        modelMapper.map(userRequest, user);
        userRepository.save(user);

        UserResponse response = new UserResponse();
        response.setUser(modelMapper.map(user, UserProjection.class));
        response.setBiodata(modelMapper.map(user.getBiodata(), BiodataProjection.class));

        return response;
    }

    // deleteUser : admin : delete
    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setIsDeleted(true);
        userRepository.save(user);
    }
}