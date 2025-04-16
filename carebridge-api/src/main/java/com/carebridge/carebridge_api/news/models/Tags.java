package com.carebridge.carebridge_api.news.models;


import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "m_tags")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class Tags extends BaseEntity {
    private String name;

    @ManyToMany(mappedBy = "tags")
    private Set<News> news;
}
