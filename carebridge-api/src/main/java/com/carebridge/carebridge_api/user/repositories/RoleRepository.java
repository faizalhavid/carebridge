package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.dto.projections.RoleProjection;
import com.carebridge.carebridge_api.user.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
 RoleProjection findRoleByCode(String code);
}
