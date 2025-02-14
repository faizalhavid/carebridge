package com.carebridge.carebridge_api.customer.repositories;

import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;


@RepositoryRestResource(collectionResourceRel = "customers", path = "customers")
public interface CustomerRepository extends JpaRepository<Customer, Long> {
//    @RestResource(exported = false)
//    @Query("select u from User u join u.customer c where c.id = ?1")
//    User findUserById(Long id);
}
