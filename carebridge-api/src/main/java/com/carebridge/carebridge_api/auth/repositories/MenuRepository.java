package com.carebridge.carebridge_api.auth.repositories;

import com.carebridge.carebridge_api.auth.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "menus", path = "menus")
public interface MenuRepository extends JpaRepository<Menu, Long> {
}
