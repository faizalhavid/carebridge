package com.carebridge.carebridge_api.access.repositories;


import com.carebridge.carebridge_api.access.models.Menu;
import com.carebridge.carebridge_api.access.models.MenuRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRoleRepository extends JpaRepository<MenuRole, Long> {
    @Query("SELECT m FROM MenuRole m WHERE m.role.code = :role")
    List<MenuRole> findByRole(String role);

    @Query("SELECT m FROM MenuRole m WHERE m.role.name = :role AND m.menuId = :menuId")
    MenuRole findByRoleAndMenuId(String role, Long menuId);
}