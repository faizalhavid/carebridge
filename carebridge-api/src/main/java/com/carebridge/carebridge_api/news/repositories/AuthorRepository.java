package com.carebridge.carebridge_api.news.repositories;

import com.carebridge.carebridge_api.news.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "authors", path = "authors")
public interface AuthorRepository extends JpaRepository<Author, Long> {
}
