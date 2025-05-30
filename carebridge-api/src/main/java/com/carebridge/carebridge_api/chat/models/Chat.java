package com.carebridge.carebridge_api.chat.models;

import java.util.List;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.doctor.models.Doctor;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_chat")
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Chat extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Customer customer;

    @Column(name = "customer_id")
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "doctor_id", insertable = false, updatable = false)
    @JsonManagedReference
    private Doctor doctor;

    @Column(name = "doctor_id")
    private Long doctorId;

    @OneToMany(mappedBy = "customerChat", cascade = CascadeType.ALL)
    @JsonBackReference
    List<ChatHistory> customerChatHistorys;
}
