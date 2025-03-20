package com.carebridge.carebridge_api.access.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_menu_role")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class MenuRole extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "menu_id", insertable = false, updatable = false)
    private Menu menu;

    @Column(name = "menu_id")
    private Long menuId;

    @ManyToOne
    @JoinColumn(name = "role_id", insertable = false, updatable = false)
    @JsonIgnore
    private Role role;
}
