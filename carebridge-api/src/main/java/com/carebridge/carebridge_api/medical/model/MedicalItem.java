package com.carebridge.carebridge_api.medical.model;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "m_medical_item")
public class MedicalItem extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name", length = 50)
  private String name;

  @ManyToOne
  @JoinColumn(name = "medical_item_category_id", insertable = false, updatable = false)
  private MedicalItemCategory medicalItemCategory;

  @Column(name = "medical_item_category_id")
  private Long medicalItemCategoryId;

  @Lob
  @Column(name = "composition", columnDefinition = "TEXT")
  private String composition;

  @ManyToOne
  @JoinColumn(name = "medical_item_segmentation_id", insertable = false, updatable = false)
  private MedicalItemSegmentation medicalItemSegmentation;

  @Column(name = "medical_item_segmentation_id")
  private Long medicalItemSegmentationId;

  @Column(name = "manufacturer", length = 100)
  private String manufacturer;

  @Lob
  @Column(name = "indication", columnDefinition = "TEXT")
  private String indication;

  @Lob
  @Column(name = "dosage", columnDefinition = "TEXT")
  private String dosage;
  
  @Lob
  @Column(name = "directions", columnDefinition = "TEXT")
  private String directions;
  
  @Lob
  @Column(name = "contradiction", columnDefinition = "TEXT")
  private String contradiction;
  
  @Lob
  @Column(name = "caution", columnDefinition = "TEXT")
  private String caution;

  @Column(name = "packaging", length = 50)
  private String packaging;

  @Column(name = "price_max")
  private Long priceMax;

  @Column(name = "price_min")
  private Long priceMin;

  @Lob
  @Column(name = "image")
  private byte[] image;

  @Column(name = "image_path", length = 100)
  private String imagePath;
}
