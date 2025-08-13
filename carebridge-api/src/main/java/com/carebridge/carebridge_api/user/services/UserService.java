package com.carebridge.carebridge_api.user.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.access.repositories.RoleRepository;
import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.mapper.UserMapper;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.BiodataRepository;
import com.carebridge.carebridge_api.user.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BiodataRepository biodataRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @Value("${credentials.default-password}")
    private String defaultPassword;

    // getAllPUsers : admin, manager,medical, doctor : view
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toResponse);
    }

    // getUserById : admin, manager,medical, doctor : view
    public UserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(userMapper::toResponse)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    // postUser : admin : create
    public UserResponse createUser(UserRequest userRequest) {
        Biodata newUserBiodata = new Biodata();

        userRepository.findByEmailAndIsDeletedFalse(userRequest.getEmail()).ifPresent(user -> {
            throw new RuntimeException("User already exists with email: " + userRequest.getEmail());
        });

        // Get the authenticated user from the UserDetails principal
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User authenticatedUser = userRepository.findByEmailAndIsDeletedFalse(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));
        Admin authenticatedAdmin = authenticatedUser.getBiodata().getAdmin();
        if (userRequest.getRoleIds() != null && userRequest.getRoleIds().contains("ADMIN")) {
            int adminCount = userRepository.getNumberOfGenerateAdminUser(authenticatedUser.getId());
            if (adminCount >= 2) {
                throw new RuntimeException("Cannot create more than 2 users with ADMIN role.");
            }
            authenticatedAdmin.setMaxGenerateAdminUser(adminCount + 1);
        }

        User user = new User();
        user.setEmail(userRequest.getEmail());

        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(defaultPassword));
        } else {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        List<Role> roles = List.of();
        if (userRequest.getRoleIds() != null && !userRequest.getRoleIds().isEmpty()) {
            roles = roleRepository.findAllById(userRequest.getRoleIds());
            if (roles.isEmpty()) {
                throw new RuntimeException("One or more specified roles not found");
            }
        } else {
            Role defaultRole = roleRepository.findFirstByCode("ROLE_CUSTOMER")
                    .orElseThrow(() -> new RuntimeException("Default role not found: ROLE_CUSTOMER"));
            roles = List.of(defaultRole);
        }

        if (userRequest.getBiodata() != null) {
            newUserBiodata.setFullName(userRequest.getBiodata().getFullName());
            newUserBiodata.setMobilePhone(userRequest.getBiodata().getMobilePhone());
            newUserBiodata.setAddress(userRequest.getBiodata().getAddress());
        }
        biodataRepository.save(newUserBiodata);
        user.setRoles(roles);
        User savedUser = userRepository.save(user);

        return userMapper.toResponse(savedUser);
    }

    // putUser : admin : update
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        userMapper.patch(userRequest, user);
        userRepository.save(user);
        return userMapper.toResponse(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        user.setIsDeleted(true);
        userRepository.save(user);
    }

    public UserResponse updateProfile(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        if (userRequest.getEmail() != null && !userRequest.getEmail().isEmpty()) {
            user.setEmail(userRequest.getEmail());
        }
        userRepository.save(user);
        return userMapper.toResponse(user);
    }

    // public void updateImage(Long id, String imageUrl) {
    // User user = userRepository.findById(id)
    // .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    //
    // if (user.getBiodata() == null) {
    // throw new RuntimeException("User does not have biodata to update image.");
    // }
    //
    // user.getBiodata().setImage(imageUrl);
    // userRepository.save(user);
    // }
}