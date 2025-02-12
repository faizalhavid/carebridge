package com.carebridge.carebridge_api.doctor.repositories;

import com.carebridge.carebridge_api.doctor.models.EducationLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "education-levels", path = "education-levels")
public interface EducatiionLevelRepository extends JpaRepository<EducationLevel,Long> {
}
