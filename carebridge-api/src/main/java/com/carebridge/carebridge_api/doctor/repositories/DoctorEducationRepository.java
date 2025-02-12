package com.carebridge.carebridge_api.doctor.repositories;

import com.carebridge.carebridge_api.doctor.models.DoctorEducation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "doctor-educations", path = "doctor-educations")
public interface DoctorEducationRepository extends JpaRepository<DoctorEducation,Long> {
}
