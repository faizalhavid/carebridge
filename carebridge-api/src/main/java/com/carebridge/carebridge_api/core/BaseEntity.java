package com.carebridge.carebridge_api.core;


import com.carebridge.carebridge_api.core.validators.Views;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.Public.class)
    private Long id;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @JsonView(Views.Internal.class)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(nullable = false)
    @JsonView(Views.Internal.class)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    @JsonView(Views.Public.class)
    private Boolean isDeleted = false;

    @Column(nullable = true)
    @JsonView(Views.Internal.class)
    private LocalDateTime deleteAt;
}
