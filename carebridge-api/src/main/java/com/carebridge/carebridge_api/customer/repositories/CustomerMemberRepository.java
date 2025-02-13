package com.carebridge.carebridge_api.customer.repositories;

import com.carebridge.carebridge_api.customer.models.CustomerMember;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "customer-members", path = "customer-members")
public interface CustomerMemberRepository extends JpaRepository<CustomerMember,Long> {
}
