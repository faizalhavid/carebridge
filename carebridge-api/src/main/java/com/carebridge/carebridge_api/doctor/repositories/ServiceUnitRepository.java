package com.carebridge.carebridge_api.doctor.repositories;

import com.carebridge.carebridge_api.doctor.models.ServiceUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "service-units", path = "service-units")
public interface ServiceUnitRepository extends JpaRepository<ServiceUnit,Long> {
}
