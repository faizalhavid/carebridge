package com.carebridge.carebridge_api.core.configs;

import org.mapstruct.MapperConfig;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;
import org.springframework.context.annotation.Configuration;

/**
 * MapStruct configuration for the application.
 * This configuration is applied to all mappers that reference it.
 */
@Configuration
@MapperConfig(componentModel = MappingConstants.ComponentModel.SPRING, unmappedTargetPolicy = ReportingPolicy.IGNORE, unmappedSourcePolicy = ReportingPolicy.IGNORE, nullValueMappingStrategy = org.mapstruct.NullValueMappingStrategy.RETURN_DEFAULT, nullValuePropertyMappingStrategy = org.mapstruct.NullValuePropertyMappingStrategy.IGNORE)
public interface MapStructConfig {

    /**
     * Default MapStruct configuration.
     * 
     * Key features:
     * - componentModel = SPRING: Generate Spring components (@Component)
     * - unmappedTargetPolicy = IGNORE: Don't report unmapped target properties
     * - unmappedSourcePolicy = IGNORE: Don't report unmapped source properties
     * - nullValueMappingStrategy = RETURN_DEFAULT: Return default value for null
     * inputs
     * - nullValuePropertyMappingStrategy = IGNORE: Skip null properties during
     * mapping
     */
}