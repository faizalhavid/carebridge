package com.carebridge.carebridge_api.doctor.repositories;

import com.carebridge.carebridge_api.doctor.models.DoctorOffice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "doctor-offices", path = "doctor-offices")
public interface DoctorOfficeRepository extends JpaRepository<DoctorOffice,Long> {
}
