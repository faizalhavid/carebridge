package com.carebridge.carebridge_api.user.models;

import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.core.validators.Views;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.doctor.models.Doctor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_biodata")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Biodata extends BaseEntity {

    @Column(name = "full_name", length = 255)
    @JsonView(Views.Public.class)
    private String fullName;

    @Column(name = "mobile_phone", length = 15)
    @JsonView(Views.Public.class)
    private String mobilePhone;

    @Column(name = "image_path", length = 255)
    @JsonView(Views.Public.class)
    private String imagePath;

    @OneToOne(mappedBy = "biodata")
    @JsonBackReference
    @JsonView(Views.Public.class)
    private Customer customer;

    @OneToOne(mappedBy = "biodata")
    @JsonBackReference
    @JsonView(Views.Public.class)
    private Admin admin;

    @OneToOne(mappedBy = "biodata")
    @JsonBackReference
    @JsonView(Views.Public.class)
    private Doctor doctor;

    // @OneToOne(mappedBy = "biodata")
    // @JsonBackReference
    // private Medical medical;
}
