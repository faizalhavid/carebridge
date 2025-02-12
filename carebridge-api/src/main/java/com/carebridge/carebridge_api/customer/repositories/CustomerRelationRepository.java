package com.carebridge.carebridge_api.customer.repositories;

import com.carebridge.carebridge_api.customer.models.CustomerRelation;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "customers-relations", path = "customers-relations")
public interface CustomerRelationRepository extends JpaRepository<CustomerRelation,Long> {
}
