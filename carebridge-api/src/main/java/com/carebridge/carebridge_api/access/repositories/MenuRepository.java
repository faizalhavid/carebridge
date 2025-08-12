package com.carebridge.carebridge_api.access.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.carebridge.carebridge_api.access.models.Menu;

@RepositoryRestResource(collectionResourceRel = "menus", path = "menus")
public interface MenuRepository extends JpaRepository<Menu, Long> {
}
