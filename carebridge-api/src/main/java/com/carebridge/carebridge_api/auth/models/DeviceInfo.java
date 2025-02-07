package com.carebridge.carebridge_api.auth.models;


import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "m_device_info")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class DeviceInfo extends BaseEntity {
    @Column(name = "device_type", length = 50)
    private String deviceType;

    @Column(name = "operating_system", length = 50)
    private String operatingSystem;

    @Column(name = "os_version", length = 20)
    private String osVersion;

    @Column(name = "browser", length = 50)
    private String browser;

    @Column(name = "browser_version", length = 20)
    private String browserVersion;

    @Column(name = "device_token", length = 255)
    private String deviceToken;

    @Column(name = "ip_address", length = 50)
    private String ipAddress;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

}
