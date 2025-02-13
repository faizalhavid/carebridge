package com.carebridge.carebridge_api.auth.repositories;

import com.carebridge.carebridge_api.auth.models.MenuRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "menu-roles", path = "menu-roles")
public interface MenuRoleRepository extends JpaRepository<MenuRole,Long> {
}
