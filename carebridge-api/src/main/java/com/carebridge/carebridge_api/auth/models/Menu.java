package com.xa.b.miniproject.mini_project_xa.Entities;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "m_menu")
@Data
@EqualsAndHashCode(callSuper=true)
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

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
