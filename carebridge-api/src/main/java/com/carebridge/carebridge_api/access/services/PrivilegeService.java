package com.carebridge.carebridge_api.access.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.access.dto.requests.PrivilegeRequest;
import com.carebridge.carebridge_api.access.dto.responses.PrivilegeResponse;
import com.carebridge.carebridge_api.access.mappers.PrivilegeMapper;
import com.carebridge.carebridge_api.access.models.Privilege;
import com.carebridge.carebridge_api.access.repositories.PrivilegeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrivilegeService {

    private final PrivilegeRepository privilegeRepository;
    private final PrivilegeMapper privilegeMapper;

    public Page<PrivilegeResponse> getAllPrivileges(Pageable pageable) {
        return privilegeRepository.findAll(pageable)
                .map(privilegeMapper::toResponse);
    }

    public Optional<PrivilegeResponse> getPrivilegeById(Long id) {
        return privilegeRepository.findById(id)
                .map(privilegeMapper::toResponse);
    }

    public PrivilegeResponse savePrivilege(PrivilegeRequest privilegeRequest) {
        Privilege privilege = privilegeMapper.toEntity(privilegeRequest);
        privilege = privilegeRepository.save(privilege);
        return privilegeMapper.toResponse(privilege);
    }

    public List<PrivilegeResponse> savePrivileges(List<PrivilegeRequest> privilegeRequests) {
        List<Privilege> privileges = privilegeRequests.stream()
                .map(privilegeMapper::toEntity)
                .collect(Collectors.toList());
        List<Privilege> savedPrivileges = privilegeRepository.saveAll(privileges);
        return savedPrivileges.stream()
                .map(privilegeMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<PrivilegeResponse> updatePrivilege(Long id, PrivilegeRequest privilegeRequest) {
        return privilegeRepository.findById(id)
                .map(existingPrivilege -> {
                    privilegeMapper.patch(privilegeRequest, existingPrivilege);
                    Privilege updatedPrivilege = privilegeRepository.save(existingPrivilege);
                    return privilegeMapper.toResponse(updatedPrivilege);
                });
    }

    public void deletePrivilege(Long id) {
        // Todo: Implement to update base entity (soft delete)
        privilegeRepository.deleteById(id);
    }

    public void deletePrivileges(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        privilegeRepository.deleteAllById(ids);
    }

}
