package com.carebridge.carebridge_api.auth.repositories;

import com.carebridge.carebridge_api.auth.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query(value = "SELECT * FROM t_token mt WHERE mt.email = ?1 AND mt.used_for = ?2 AND mt.created_at = ((SELECT MAX(created_at) FROM t_token WHERE email = ?1 AND used_for = ?2))", nativeQuery = true)
    Optional<Token> findTokenJustCreatedByEmailAndUsedFor(String email, String usedFor);

    Optional<Token> findTokenByTokenAndEmailAndUsedFor(String token, String email, String usedFor);

    Optional<Token> findTokenByTokenAndUsedFor(String token, String string);
}
