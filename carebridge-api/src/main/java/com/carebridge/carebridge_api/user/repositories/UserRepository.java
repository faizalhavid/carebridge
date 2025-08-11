package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.models.User;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndIsDeletedFalse(String email);

    @Query("SELECT a.maxGenerateAdminUser FROM User u " +
            "LEFT JOIN u.biodata b " +
            "LEFT JOIN b.admin a " +
            "WHERE u.id = :userAdminId")
    int getNumberOfGenerateAdminUser(Long userAdminId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE m_user SET biodata_id = :biodataId WHERE id = :userId", nativeQuery = true)
    void updateBiodataId(@Param("userId") Long userId, @Param("biodataId") Long biodataId);
}