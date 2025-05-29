package com.carebridge.carebridge_api.core.configs;

import com.carebridge.carebridge_api.access.models.Role;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

@Configuration
public class RestResourceConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config,
            org.springframework.web.servlet.config.annotation.CorsRegistry cors) {
        // Expose IDs for all entities
        config.exposeIdsFor(
                Role.class
        // Add other entity classes here as needed, e.g. User.class, Product.class
        );
    }
}