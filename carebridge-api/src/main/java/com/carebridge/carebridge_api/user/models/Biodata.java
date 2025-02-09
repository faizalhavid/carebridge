package com.carebridge.carebridge_api.user.models;

import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(name = "fullname", length = 255)
    private String fullname;

    @Column(name = "mobile_phone", length = 15)
    private String mobilePhone;

    @Column(name = "image_path", length = 255)
    private String imagePath;

    @OneToMany(mappedBy = "biodata", cascade = CascadeType.ALL)
    @JsonBackReference
    List<Customer> customer;

    @OneToMany(mappedBy = "biodata", cascade = CascadeType.ALL)
    @JsonBackReference
    List<Admin> admin;

    // @OneToMany(mappedBy="biodata", cascade= CascadeType.ALL)
    // @JsonBackReference
    // List<Doctor> doctor;
}
