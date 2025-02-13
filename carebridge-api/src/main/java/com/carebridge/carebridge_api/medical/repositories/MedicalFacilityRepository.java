package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.MedicalFacility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "medical-facilities", path = "medical-facilities")
public interface MedicalFacilityRepository extends JpaRepository<MedicalFacility, Long> {
}
