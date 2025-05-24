
package com.carebridge.carebridge_api.access.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carebridge.carebridge_api.access.models.Privilege;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

}