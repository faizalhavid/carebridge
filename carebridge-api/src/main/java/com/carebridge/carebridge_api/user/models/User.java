package com.carebridge.carebridge_api.user.models;

import com.carebridge.carebridge_api.access.models.Role;
import com.carebridge.carebridge_api.auth.models.DeviceInfo;
import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.core.validators.Views;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Stream;

@Entity
@Data
@Table(name = "m_user")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity implements UserDetails {

    @ManyToOne
    @JoinColumn(name = "biodata_id", insertable = false, updatable = false)
    @JsonManagedReference
    @JsonView(Views.Public.class)
    private Biodata biodata;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonManagedReference
    @JsonView(Views.Public.class)
    private Collection<Role> roles;

    @Column(name = "email", length = 100, unique = true)
    @JsonView(Views.Public.class)
    private String email;

    @JsonIgnore
    @Column(name = "password", length = 255)
    @JsonView(Views.Public.class)
    private String password;

    @Column(name = "login_attempt", columnDefinition = "int default 0")
    @JsonView(Views.Internal.class)
    private Integer loginAttempt = 0;

    @Column(name = "is_locked", columnDefinition = "boolean default false")
    @JsonView(Views.Public.class)
    private Boolean isLocked = false;

    @Column(name = "last_login")
    @JsonView(Views.Public.class)
    private LocalDateTime lastLogin;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonView(Views.Internal.class)
    private List<DeviceInfo> deviceInfos;

    @Override
    public List<SimpleGrantedAuthority> getAuthorities() {
        if (roles == null) {
            return Collections.emptyList();
        }
        return roles.stream()
                .flatMap(role -> {
                    // Role as authority
                    Stream<SimpleGrantedAuthority> roleAuth = Stream
                            .of(new SimpleGrantedAuthority(role.getCode()));
                    // Privileges as authorities
                    Stream<SimpleGrantedAuthority> privAuth = role.getPrivileges() == null
                            ? Stream.empty()
                            : role.getPrivileges().stream()
                            .map(priv -> new SimpleGrantedAuthority(priv.getCode()));
                    return Stream.concat(roleAuth, privAuth);
                })
                .toList();
    }


    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public String getPassword() {
        return password;
    }
}