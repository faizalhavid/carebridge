package com.carebridge.carebridge_api.access.repositories;

import com.carebridge.carebridge_api.access.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findFirstByCode(String code);
}