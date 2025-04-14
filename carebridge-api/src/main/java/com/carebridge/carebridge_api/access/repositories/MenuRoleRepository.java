package com.carebridge.carebridge_api.access.repositories;

import com.carebridge.carebridge_api.access.models.MenuRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRoleRepository extends JpaRepository<MenuRole, Long> {

    @Query("SELECT m FROM MenuRole m WHERE m.role.code = :role")
    List<MenuRole> findByRole(@Param("role") String role);

    @Query("SELECT m FROM MenuRole m WHERE m.role.code = :role AND m.id = :menuId")
    MenuRole findByRoleAndMenuId(@Param("role") String role, @Param("menuId") Long menuId);
}