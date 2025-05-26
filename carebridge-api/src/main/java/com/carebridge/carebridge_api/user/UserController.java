package com.carebridge.carebridge_api.user;

import com.carebridge.carebridge_api.user.dto.requests.UserRequest;
import com.carebridge.carebridge_api.user.dto.responses.UserResponse;
import com.carebridge.carebridge_api.user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
//    @GetMapping
//    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR')")
//    public ResponseEntity<List<UserResponse>> getAllUsers() {
//        return ResponseEntity.ok(userService.getAllUsers());
//    }

    // GET /api/users/{id} - Get user by ID
//    @GetMapping("/{id}")
//    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'MEDICAL', 'DOCTOR')")
//    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
//        return ResponseEntity.ok(userService.getUserById(id));
//    }

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