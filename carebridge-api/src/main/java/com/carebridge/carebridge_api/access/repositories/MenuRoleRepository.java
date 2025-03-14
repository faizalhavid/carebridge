package com.carebridge.carebridge_api.access.repositories;


import com.carebridge.carebridge_api.access.models.Menu;
import com.carebridge.carebridge_api.access.models.MenuRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "menuRoles", path = "menuRoles")
public interface MenuRoleRepository extends JpaRepository<MenuRole, Long> {
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    <S extends MenuRole> S save(S entity);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void deleteById(Long aLong);

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Override
    void delete(MenuRole entity);

}
