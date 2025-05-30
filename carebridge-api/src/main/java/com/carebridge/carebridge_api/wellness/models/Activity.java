package com.carebridge.carebridge_api.wellness.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "m_activity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Activity extends BaseEntity {
    @Column(nullable = false)
    private String name;

    private String description;
}