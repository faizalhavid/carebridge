package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.MedicalItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "medical-item-categories", path = "medical-item-categories")
public interface MedicalItemCategoryRepository extends JpaRepository<MedicalItemCategory,Long> {
}
