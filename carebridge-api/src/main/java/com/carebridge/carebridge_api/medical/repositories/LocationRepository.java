package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "locations", path = "locations")
public interface LocationRepository extends JpaRepository<Location, Long> {
}