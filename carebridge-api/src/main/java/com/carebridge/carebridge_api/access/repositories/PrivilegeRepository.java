
package com.carebridge.carebridge_api.access.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.carebridge.carebridge_api.access.models.Privilege;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource(collectionResourceRel = "privileges", path = "privileges")
@PreAuthorize("hasRole('ADMIN') or hasAuthority('PRIVILEGE_MANAGE')")
public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

}