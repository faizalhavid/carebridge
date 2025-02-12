package com.carebridge.carebridge_api.customer.repositories;

import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
