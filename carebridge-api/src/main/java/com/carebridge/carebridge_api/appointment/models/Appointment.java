package com.carebridge.carebridge_api.appointment.models;

import java.time.LocalDate;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.doctor.models.DoctorOffice;
import com.carebridge.carebridge_api.doctor.models.DoctorOfficeSchedule;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "t_appointment")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Appointment extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "customer_id", insertable = false, updatable = false)
    private Customer customer;

    @Column(name = "customer_id")
    private Long customerId;

    @ManyToOne
    @JoinColumn(name = "doctor_office_id", insertable = false, updatable = false)
    private DoctorOffice doctorOffice;

    @Column(name = "doctor_office_id")
    private Long doctorOfficeId;

    @ManyToOne
    @JoinColumn(name = "doctor_office_schedule_id", insertable = false, updatable = false)
    private DoctorOfficeSchedule doctorOfficeSchedule;

    @Column(name = "doctor_office_schedule_id")
    private Long doctorOfficeScheduleId;

//    @ManyToOne
//    @JoinColumn(name = "doctor_office_treatment_id", insertable = false, updatable = false)
//    private DoctorOfficeTreatment doctorOfficeTreatment;

    @Column(name = "doctor_office_treatment_id")
    private Long doctorOfficeTreatmentId;

    @Column(name = "appointment_date")
    private LocalDate date;

}
