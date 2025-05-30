package com.carebridge.carebridge_api.access.repositories;

import com.carebridge.carebridge_api.access.models.MenuRole;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MenuRoleRepository extends JpaRepository<MenuRole, Long> {

    @Query("SELECT m FROM MenuRole m WHERE m.role.code IN :roles")
    Page<MenuRole> findByRoles(@Param("roles") List<String> roles, Pageable pageable);

    @Query("SELECT m FROM MenuRole m WHERE m.role.code IN :roles AND m.id = :menuId")
    MenuRole findByRoleAndMenuId(@Param("roles") List<String> roles, @Param("menuId") Long menuId);

    @Query("UPDATE MenuRole m SET m.isDeleted = true, m.updatedAt = CURRENT_TIMESTAMP WHERE m.id = :id")
    void safeDelete(@Param("id") long id);

    @Query("UPDATE MenuRole m SET m.isDeleted = true,  m.updatedAt = CURRENT_TIMESTAMP WHERE m.id IN :ids")
    void safeDeleteAll(List<Long> ids);
}