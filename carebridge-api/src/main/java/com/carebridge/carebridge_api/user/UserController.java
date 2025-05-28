package com.carebridge.carebridge_api.user;

import com.carebridge.carebridge_api.core.annotations.validators.Views;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;
import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.services.UserService;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users - Get all users
    @GetMapping
    @JsonView(Views.Public.class)
    public ResponseEntity<PagedModel<EntityModel<UserResponse>>> getUsers(Pageable pageable) {
        Page<UserResponse> users = userService.getAllUsers(pageable);

        PagedModel<EntityModel<UserResponse>> pagedModel = PagedModel.of(
                users.getContent().stream().map(EntityModel::of).toList(),
                new PagedModel.PageMetadata(users.getSize(), users.getNumber(), users.getTotalElements(),
                        users.getTotalPages()));

        return ResponseEntity.ok(pagedModel);
    }

    // G// GET /api/users/{id} - Get user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR')")
    public ResponseEntity<SuccessResponse<UserResponse, Object>> getUserById(@PathVariable Long id) {
        UserResponse user = userService.getUserById(id);
        return ResponseEntity.ok(new SuccessResponse<>(user, "Get user by ID successful", 200));
    }

    // POST /api/users - Create a new user
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SuccessResponse<UserResponse, Object>> createUser(@RequestBody UserRequest userRequest) {
        UserResponse user = userService.createUser(userRequest);
        return ResponseEntity.ok(new SuccessResponse<>(user, "Create user successful", 200));
    }

    // PUT /api/users/{id} - Update an existing user
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SuccessResponse<UserResponse, Object>> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        UserResponse user = userService.updateUser(id, userRequest);
        return ResponseEntity.ok(new SuccessResponse<>(user, "Update user successful", 200));
    }

    // DELETE /api/users/{id} - Delete a user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete user successful", 200));
    }
    
    @PutMapping("/update-profile/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR')")
    public ResponseEntity<SuccessResponse<UserResponse, Object>> updateProfile(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        UserResponse user = userService.updateProfile(id, userRequest);
        return ResponseEntity.ok(new SuccessResponse<>(user, "Update profile successful", 200));
    }
}