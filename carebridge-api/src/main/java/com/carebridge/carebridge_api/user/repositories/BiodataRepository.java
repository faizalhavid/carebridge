package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.models.Biodata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BiodataRepository extends JpaRepository<Biodata, Long> {
//    @Query("SELECT b FROM Biodata b JOIN b.user u WHERE u.id = :userId")
//    Optional<Biodata> findBiodataByUserId(@Param("userId") Long userId);
}