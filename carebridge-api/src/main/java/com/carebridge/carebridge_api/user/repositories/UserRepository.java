package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.models.User;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIsDeletedFalse(String email);

    @Query("SELECT a.maxGenerateAdminUser FROM User u " +
            "LEFT JOIN u.biodata b " +
            "LEFT JOIN b.admin a " +
            "WHERE u.id = :userAdminId")
    int getNumberOfGenerateAdminUser(Long userAdminId);
}