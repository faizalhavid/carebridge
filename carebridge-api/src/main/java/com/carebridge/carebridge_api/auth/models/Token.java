package com.carebridge.carebridge_api.auth.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.core.enums.TokenUsedFor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "t_token")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Token extends BaseEntity {

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "user_id", length = 100)
    private Long userId;

    @Column(name = "token", length = 500)
    private String token;

    @Column(name = "expired_on")
    private LocalDateTime expiredAt;

    @Column(name = "is_expired")
    private Boolean isExpired;

    @Enumerated(EnumType.STRING)
    @Column(name = "used_for", length = 100)
    private TokenUsedFor usedFor;

}