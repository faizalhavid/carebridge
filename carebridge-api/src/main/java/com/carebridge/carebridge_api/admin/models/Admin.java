package com.carebridge.carebridge_api.admin.models;


import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name="m_biodata")
@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
public class Admin extends BaseEntity{

}