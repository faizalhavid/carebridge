package com.carebridge.carebridge_api.access.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.core.annotations.validators.Views;
import com.carebridge.carebridge_api.user.models.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Entity
@Data
@Table(name = "m_role")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Role extends BaseEntity {

    @Column(name = "name", length = 20)
    @JsonView(Views.Public.class)
    private String name;

    @Column(name = "code", length = 20)
    @JsonView(Views.Public.class)
    private String code;

    @ManyToMany(mappedBy = "roles")
    @JsonBackReference
    @JsonView(Views.Public.class)
    private Collection<User> users;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "roles_privileges", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "privilege_id"))
    @JsonView(Views.Public.class)
    private Collection<Privilege> privileges;
}
