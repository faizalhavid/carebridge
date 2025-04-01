package com.carebridge.carebridge_api.access.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_menu")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {

    @Column(name = "name", length = 20)
    private String name;

    @Column(name = "url", length = 50)
    private String url;

    @ManyToOne
    @JoinColumn(name = "parent_id", insertable = false, updatable = false)
    private Menu parent;

    @Column(name = "parent_id")
    private Long parentId;

    @OneToMany(mappedBy = "parent")
    private List<Menu> children;

    @Column(name = "big_icon", length = 100)
    private String bigIcon;

    @Column(name = "small_icon", length = 100)
    private String smallIcon;
}
