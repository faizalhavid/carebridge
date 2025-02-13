package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.medical.model.MedicalFacilitySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "medical-facility-schedules", path = "medical-facility-schedules")
public interface MedicalFacilityScheduleRepository extends JpaRepository<MedicalFacilitySchedule,Long> {
}
