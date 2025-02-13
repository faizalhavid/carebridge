package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.MedicalFacilityCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "medical-facility-categories", path = "medical-facility-categories")
public interface MedicalFacilityCategoryRepository extends JpaRepository<MedicalFacilityCategory,Long> {
}
