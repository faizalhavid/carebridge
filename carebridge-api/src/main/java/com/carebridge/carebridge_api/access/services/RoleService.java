package com.carebridge.carebridge_api.access.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.access.dto.requests.RoleRequest;
import com.carebridge.carebridge_api.access.dto.responses.RoleResponse;
import com.carebridge.carebridge_api.access.mappers.RoleMapper;
import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.access.repositories.RoleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;
    private final RoleMapper roleMapper;

    public Page<RoleResponse> getAllRoles(Pageable pageable) {
        return roleRepository.findAll(pageable)
                .map(roleMapper::toResponse);
    }

    public Optional<RoleResponse> getRoleById(Long id) {
        return roleRepository.findById(id)
                .map(roleMapper::toResponse);
    }

    public RoleResponse saveRole(RoleRequest roleRequest) {
        Role role = roleMapper.toEntity(roleRequest);
        role = roleRepository.save(role);
        return roleMapper.toResponse(role);
    }

    public List<RoleResponse> saveRoles(List<RoleRequest> roleRequests) {
        List<Role> roles = roleRequests.stream()
                .map(roleMapper::toEntity)
                .collect(Collectors.toList());
        List<Role> savedRoles = roleRepository.saveAll(roles);
        return savedRoles.stream()
                .map(roleMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<RoleResponse> updateRole(Long id, RoleRequest roleRequest) {
        return roleRepository.findById(id)
                .map(existingRole -> {
                    roleMapper.patch(roleRequest, existingRole);
                    Role updatedRole = roleRepository.save(existingRole);
                    return roleMapper.toResponse(updatedRole);
                });
    }

    public void deleteRole(Long id) {
        // Todo: Implement to update base entity (soft delete)
        roleRepository.deleteById(id);
    }

    public void deleteRoles(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        roleRepository.deleteAllById(ids);
    }

}
