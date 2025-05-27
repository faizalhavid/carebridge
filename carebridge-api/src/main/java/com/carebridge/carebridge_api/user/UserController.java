package com.carebridge.carebridge_api.user;

import com.carebridge.carebridge_api.core.responses.SuccessResponse;
import com.carebridge.carebridge_api.core.validators.Views;
import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.models.User;
import com.carebridge.carebridge_api.user.services.UserService;
import com.fasterxml.jackson.annotation.JsonView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/users")
public class UserController {

    @Autowired
    private UserService userService;

    // GET /api/users - Get all users
    @GetMapping
    // @JsonView(Views.Public.class)
    public ResponseEntity<PagedModel<EntityModel<UserResponse>>> getUsers(Pageable pageable) {
        Page<UserResponse> users = userService.getAllUsers(pageable);

        PagedModel<EntityModel<UserResponse>> pagedModel = PagedModel.of(
                users.getContent().stream().map(EntityModel::of).toList(),
                new PagedModel.PageMetadata(users.getSize(), users.getNumber(), users.getTotalElements(),
                        users.getTotalPages()));

        return ResponseEntity.ok(pagedModel);
    }

    // GET /api/users/{id} - Get user by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR')")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    // POST /api/users - Create a new user
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.createUser(userRequest));
    }

    // PUT /api/users/{id} - Update an existing user
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<UserResponse> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        return ResponseEntity.ok(userService.updateUser(id, userRequest));
    }

    // DELETE /api/users/{id} - Delete a user
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}