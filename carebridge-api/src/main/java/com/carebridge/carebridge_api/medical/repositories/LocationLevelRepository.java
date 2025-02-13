package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.LocationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "location-levels", path = "location-levels")
public interface LocationLevelRepository extends JpaRepository<LocationLevel,Long> {
}
