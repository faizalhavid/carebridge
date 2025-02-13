package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.MedicalItemSegmentation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "medical-item-segmentations", path = "medical-item-segmentations")
public interface MedicalItemSegmentationRepository extends JpaRepository<MedicalItemSegmentation,Long> {
}
