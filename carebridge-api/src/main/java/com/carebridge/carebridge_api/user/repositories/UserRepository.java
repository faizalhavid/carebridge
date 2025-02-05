package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
