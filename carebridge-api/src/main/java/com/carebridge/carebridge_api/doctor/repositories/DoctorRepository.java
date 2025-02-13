package com.carebridge.carebridge_api.doctor.repositories;

import com.carebridge.carebridge_api.doctor.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "doctors", path = "doctors")
public interface DoctorRepository extends JpaRepository<Doctor,Long> {
}
