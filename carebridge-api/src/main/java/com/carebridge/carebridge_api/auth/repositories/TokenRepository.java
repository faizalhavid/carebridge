package com.carebridge.carebridge_api.auth.repositories;

import com.carebridge.carebridge_api.auth.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {


}
