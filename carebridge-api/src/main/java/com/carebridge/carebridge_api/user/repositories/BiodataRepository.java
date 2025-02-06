package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.models.Biodata;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BiodataRepository extends JpaRepository<Biodata, Long> {

    Optional<Biodata> findBiodataByUserId(Long userId);
}
