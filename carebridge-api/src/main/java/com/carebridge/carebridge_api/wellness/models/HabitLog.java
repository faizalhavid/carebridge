package com.carebridge.carebridge_api.wellness.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "m_habit_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class HabitLog extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "habit_id")
    private Habit habit;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Boolean isDone;
}