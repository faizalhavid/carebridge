package com.carebridge.carebridge_api.user.services;

import java.util.List;

import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.access.repositories.RoleRepository;
import com.carebridge.carebridge_api.admin.models.Admin;

import com.carebridge.carebridge_api.user.dto.responses.ProfileResponse;
import com.carebridge.carebridge_api.user.repositories.BiodataRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.carebridge.carebridge_api.user.dto.requests.BiodataRequest;
import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.models.Biodata;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.repositories.UserRepository;
import com.carebridge.carebridge_api.core.utils.PatchUtil;

@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BiodataRepository biodataRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    @Qualifier("patchMapper")
    private ModelMapper patchMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${credentials.default-password}")
    private String defaultPassword;

    // getAllUsers : admin, manager,medical, doctor : view
    public Page<UserResponse> getAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(user -> {
                    UserResponse response = modelMapper.map(user, UserResponse.class);
                    if (user.getBiodata() != null) {
                        response.setBiodata(modelMapper.map(user.getBiodata(), ProfileResponse.class));
                    }
                    return response;
                });
    }

    // getUserById : admin, manager,medical, doctor : view
    public UserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    UserResponse response = modelMapper.map(user, UserResponse.class);
                    if (user.getBiodata() != null) {
                        response.setBiodata(modelMapper.map(user.getBiodata(), ProfileResponse.class));
                    }
                    return response;
                })
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
        if (userRequest.getRoles() != null && userRequest.getRoles().contains("ADMIN")) {
            int adminCount = userRepository.getNumberOfGenerateAdminUser(authenticatedUser.getId());
            if (adminCount >= 2) {
                throw new RuntimeException("Cannot create more than 2 users with ADMIN role.");
            }
            authenticatedAdmin.setMaxGenerateAdminUser(adminCount + 1);
        }

        // Create user manually to avoid ModelMapper mapping biodata
        User user = new User();
        user.setEmail(userRequest.getEmail());

        if (userRequest.getPassword() == null || userRequest.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(defaultPassword));
        } else {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        List<Role> roles;
        if (userRequest.getRoles() != null && !userRequest.getRoles().isEmpty()) {
            roles = roleRepository.findByCodeIn(userRequest.getRoles())
                    .orElseThrow(() -> new RuntimeException("One or more specified roles not found"));
        } else {
            // Assign default role when no roles specified
            Role defaultRole = roleRepository.findFirstByCode("ROLE_CUSTOMER")
                    .orElseThrow(() -> new RuntimeException("Default role not found: ROLE_CUSTOMER"));
            roles = List.of(defaultRole);
        }

        // Handle nullable biodata
        Biodata savedBiodata = null;
        System.out.println("user request" + userRequest);
        if (userRequest.getBiodata() != null) {
            newUserBiodata.setFullName(userRequest.getBiodata().getFullName());
            newUserBiodata.setMobilePhone(userRequest.getBiodata().getMobilePhone());
            newUserBiodata.setAddress(userRequest.getBiodata().getAddress());
            savedBiodata = biodataRepository.save(newUserBiodata);
        } else {
            savedBiodata = biodataRepository.save(newUserBiodata);
        }

        user.setRoles(roles);
        User savedUser = userRepository.save(user);

        // Manually update the biodata_id after saving the user
        if (savedBiodata != null) {
            userRepository.updateBiodataId(savedUser.getId(), savedBiodata.getId());
            savedUser = userRepository.findById(savedUser.getId()).orElse(savedUser);
        }

        return modelMapper.map(savedUser, UserResponse.class);
    }

    // putUser : admin : update
    public UserResponse updateUser(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Apply patch mapping manually to avoid transient object issues
        patchUser(user, userRequest);

        userRepository.save(user);

        return modelMapper.map(user, UserResponse.class);
    }

    private void patchUser(User user, UserRequest userRequest) {
        // Update email if provided
        if (userRequest.getEmail() != null && !userRequest.getEmail().trim().isEmpty()) {
            user.setEmail(userRequest.getEmail());
        }

        // Update password if provided
        if (userRequest.getPassword() != null && !userRequest.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        // Update roles if provided
        if (userRequest.getRoles() != null && !userRequest.getRoles().isEmpty()) {
            List<Role> roles = roleRepository.findByCodeIn(userRequest.getRoles())
                    .orElseThrow(() -> new RuntimeException("One or more specified roles not found"));
            user.setRoles(roles);
        }

        // Update biodata if provided
        if (userRequest.getBiodata() != null) {
            patchBiodata(user, userRequest.getBiodata());
        }
    }

    // Alternative implementation using patch mapper
    public UserResponse updateUserWithPatchMapper(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Use patch mapper to only update non-null values
        // But exclude biodata to handle it separately
        UserRequest safeRequest = new UserRequest();
        safeRequest.setEmail(userRequest.getEmail());
        safeRequest.setPassword(userRequest.getPassword());
        safeRequest.setRoles(userRequest.getRoles());
        // Don't set biodata here to avoid transient object issues

        patchMapper.map(safeRequest, user);

        // Handle password encoding if it was updated
        if (userRequest.getPassword() != null && !userRequest.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        // Handle roles if provided
        if (userRequest.getRoles() != null && !userRequest.getRoles().isEmpty()) {
            List<Role> roles = roleRepository.findByCodeIn(userRequest.getRoles())
                    .orElseThrow(() -> new RuntimeException("One or more specified roles not found"));
            user.setRoles(roles);
        }

        // Handle biodata separately
        if (userRequest.getBiodata() != null) {
            patchBiodata(user, userRequest.getBiodata());
        }

        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
    }

    private void patchBiodata(User user, BiodataRequest biodataRequest) {
        Biodata biodata = user.getBiodata();

        // Create new biodata if user doesn't have one
        if (biodata == null) {
            biodata = new Biodata();
            biodata = biodataRepository.save(biodata);
            userRepository.updateBiodataId(user.getId(), biodata.getId());
            user.setBiodata(biodata);
        }

        // Update biodata fields if provided
        if (biodataRequest.getFullName() != null) {
            biodata.setFullName(biodataRequest.getFullName().trim().isEmpty() ? null : biodataRequest.getFullName());
        }

        if (biodataRequest.getMobilePhone() != null) {
            biodata.setMobilePhone(
                    biodataRequest.getMobilePhone().trim().isEmpty() ? null : biodataRequest.getMobilePhone());
        }

        if (biodataRequest.getAddress() != null) {
            biodata.setAddress(biodataRequest.getAddress().trim().isEmpty() ? null : biodataRequest.getAddress());
        }

        biodataRepository.save(biodata);
    }

    // Example using PatchUtil - Alternative approach
    public UserResponse updateUserWithPatchUtil(Long id, UserRequest userRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Use PatchUtil to apply updates, excluding sensitive fields
        PatchUtil.applyPatch(userRequest, user, "biodata", "roles");

        // Handle password encoding if updated
        if (PatchUtil.shouldUpdate(userRequest.getPassword())) {
            user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        }

        // Handle roles separately
        if (userRequest.getRoles() != null && !userRequest.getRoles().isEmpty()) {
            List<Role> roles = roleRepository.findByCodeIn(userRequest.getRoles())
                    .orElseThrow(() -> new RuntimeException("One or more specified roles not found"));
            user.setRoles(roles);
        }

        // Handle biodata separately
        if (userRequest.getBiodata() != null) {
            patchBiodata(user, userRequest.getBiodata());
        }

        userRepository.save(user);
        return modelMapper.map(user, UserResponse.class);
    }

    // deleteUser : admin : delete
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

        return modelMapper.map(user, UserResponse.class);
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