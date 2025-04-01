package com.carebridge.carebridge_api.access.repositories;

import com.carebridge.carebridge_api.access.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "menus", path = "menus")
public interface MenuRepository extends JpaRepository<Menu, Long> {
}
