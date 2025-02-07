package com.carebridge.carebridge_api.admin.repositories;

import com.carebridge.carebridge_api.admin.models.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
}
