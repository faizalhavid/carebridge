package com.carebridge.carebridge_api.medical.model;

import java.util.List;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_medical_item_category")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor @AllArgsConstructor
public class MedicalItemCategory extends BaseEntity {

  @Column(name = "name", length = 50)
  private String name;

  @OneToMany(mappedBy = "medicalItemCategory")
  private List<MedicalItem> medicalItems;
}
