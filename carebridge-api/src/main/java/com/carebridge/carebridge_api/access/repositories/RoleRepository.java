package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.dto.projections.RoleProjection;
import com.carebridge.carebridge_api.user.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findFirstByCode(String code);
}