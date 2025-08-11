package com.carebridge.carebridge_api.core.configs;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT);
        return mapper;
    }

    @Bean("patchMapper")
    public ModelMapper patchMapper() {
        ModelMapper mapper = new ModelMapper();

        // Configure for patch operations - skip null values and empty strings
        mapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setSkipNullEnabled(true)
                .setPropertyCondition(context -> {
                    // Skip null values and empty strings
                    Object source = context.getSource();
                    if (source == null)
                        return false;
                    if (source instanceof String && ((String) source).trim().isEmpty())
                        return false;
                    return true;
                });

        return mapper;
    }
}