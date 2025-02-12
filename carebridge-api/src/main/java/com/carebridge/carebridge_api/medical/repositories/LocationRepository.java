package com.carebridge.carebridge_api.medical.repositories;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.medical.model.Location;
import com.carebridge.carebridge_api.medical.model.LocationLevel;
import com.carebridge.carebridge_api.medical.model.MedicalFacility;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "locations", path = "locations")
public interface LocationRepository extends JpaRepository<Location,Long> {
}