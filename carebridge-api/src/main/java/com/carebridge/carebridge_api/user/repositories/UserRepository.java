package com.carebridge.carebridge_api.user.repositories;

import com.carebridge.carebridge_api.user.dto.projections.UserProjection;
import com.carebridge.carebridge_api.user.models.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(collectionResourceRel = "users", path = "users", excerptProjection = UserProjection.class)
public interface UserRepository extends JpaRepository<User, Long> {
    @RestResource(exported = false)
    Optional<User> findById(Long id);

    @RestResource(exported = false)
    Optional<User> findByEmailAndIsDeletedFalse(String email);

    @RestResource(exported = false)
    <S extends User> S save(S entity);

//    @RestResource(exported = false)
//    void deleteById(Long id);

    @RestResource(exported = false)
    void delete(User entity);

    @Query("SELECT a.maxGenerateAdminUser FROM User u " +
            "LEFT JOIN u.biodata b " +
            "LEFT JOIN b.admin a " +
            "WHERE u.id = :userAdminId")
    int getNumberOfGenerateAdminUser(Long userAdminId);
}