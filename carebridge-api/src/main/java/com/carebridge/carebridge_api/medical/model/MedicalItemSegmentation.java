package com.carebridge.carebridge_api.medical.model;

import java.util.List;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_medical_item_segmentation")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class MedicalItemSegmentation extends BaseEntity {

  @Column(name = "name", length = 50)
  private String name;

  @OneToMany(mappedBy = "medicalItemSegmentation")
  private List<MedicalItem> medicalItems;
}
