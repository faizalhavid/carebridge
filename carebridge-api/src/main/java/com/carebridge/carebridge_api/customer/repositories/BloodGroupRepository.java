package com.carebridge.carebridge_api.customer.repositories;

import com.carebridge.carebridge_api.customer.models.BloodGroup;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "blood-groups", path = "blood-groups")
public interface BloodGroupRepository extends JpaRepository<BloodGroup, Long> {
}
