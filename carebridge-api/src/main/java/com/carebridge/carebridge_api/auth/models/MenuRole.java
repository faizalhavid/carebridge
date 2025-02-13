package com.carebridge.carebridge_api.auth.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.carebridge.carebridge_api.user.models.Role;
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
@Table(name = "m_menu_role")
@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
public class MenuRole extends BaseEntity {

  @ManyToOne
  @JoinColumn(name = "menu_id", insertable = false, updatable = false)
  private Menu menu;

  @Column(name = "menu_id")
  private Long menuId;
  
  @ManyToOne
  @JoinColumn(name = "role_id", insertable = false, updatable = false)
  private Role role;

  @Column(name = "role_id")
  private Long roleId;
}
