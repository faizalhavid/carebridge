package com.carebridge.carebridge_api.customer.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.customer.dto.requests.BloodGroupRequest;
import com.carebridge.carebridge_api.customer.dto.responses.BloodGroupResponse;
import com.carebridge.carebridge_api.customer.mappers.BloodGroupMapper;
import com.carebridge.carebridge_api.customer.models.BloodGroup;
import com.carebridge.carebridge_api.customer.repositories.BloodGroupRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BloodGroupService {

    private final BloodGroupRepository bloodGroupRepository;
    private final BloodGroupMapper bloodGroupMapper;

    public Page<BloodGroupResponse> getAllBloodGroups(Pageable pageable) {
        return bloodGroupRepository.findAll(pageable)
                .map(bloodGroupMapper::toResponse);
    }

    public Optional<BloodGroupResponse> getBloodGroupById(Long id) {
        return bloodGroupRepository.findById(id)
                .map(bloodGroupMapper::toResponse);
    }

    public BloodGroupResponse saveBloodGroup(BloodGroupRequest bloodGroupRequest) {
        BloodGroup bloodGroup = bloodGroupMapper.toEntity(bloodGroupRequest);
        bloodGroup = bloodGroupRepository.save(bloodGroup);
        return bloodGroupMapper.toResponse(bloodGroup);
    }

    public List<BloodGroupResponse> saveBloodGroups(List<BloodGroupRequest> bloodGroupRequests) {
        List<BloodGroup> bloodGroups = bloodGroupRequests.stream()
                .map(bloodGroupMapper::toEntity)
                .collect(Collectors.toList());
        List<BloodGroup> savedBloodGroups = bloodGroupRepository.saveAll(bloodGroups);
        return savedBloodGroups.stream()
                .map(bloodGroupMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<BloodGroupResponse> updateBloodGroup(Long id, BloodGroupRequest bloodGroupRequest) {
        return bloodGroupRepository.findById(id)
                .map(existingBloodGroup -> {
                    bloodGroupMapper.patch(bloodGroupRequest, existingBloodGroup);
                    BloodGroup updatedBloodGroup = bloodGroupRepository.save(existingBloodGroup);
                    return bloodGroupMapper.toResponse(updatedBloodGroup);
                });
    }

    public void deleteBloodGroup(Long id) {
        // Todo: Implement to update base entity (soft delete)
        bloodGroupRepository.deleteById(id);
    }

    public void deleteBloodGroups(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        bloodGroupRepository.deleteAllById(ids);
    }

}
