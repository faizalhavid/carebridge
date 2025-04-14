package com.carebridge.carebridge_api.news.repositories;

import com.carebridge.carebridge_api.news.models.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "tags", path = "tags")
public interface TagsRepository extends JpaRepository<Tags, Long> {

}
