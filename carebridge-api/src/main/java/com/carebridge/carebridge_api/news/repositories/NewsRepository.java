package com.carebridge.carebridge_api.news.repositories;

import com.carebridge.carebridge_api.news.models.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "news", path = "news")
public interface NewsRepository extends JpaRepository<News, Long> {

}
