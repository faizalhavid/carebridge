package com.carebridge.carebridge_api.wellness.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "m_habit")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Habit extends BaseEntity {
    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}