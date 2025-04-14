package com.carebridge.carebridge_api.news.models;


import com.carebridge.carebridge_api.admin.models.Admin;
import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_author")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Author extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @OneToMany(mappedBy = "author")
    private List<News> news;
}
