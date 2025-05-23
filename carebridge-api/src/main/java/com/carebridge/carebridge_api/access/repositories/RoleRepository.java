package com.carebridge.carebridge_api.access.repositories;

import com.carebridge.carebridge_api.access.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;

@RepositoryRestResource(collectionResourceRel = "roles", path = "roles")
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findFirstByCode(String code);
}