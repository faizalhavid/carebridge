package com.carebridge.carebridge_api.news.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "m_news")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class News extends BaseEntity {
    private String title;
    private String content;
    private String imageUrl;
    private String sourceUrl;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private Author author;
    @ManyToMany
    @JoinTable(
            name = "news_tags",
            joinColumns = @JoinColumn(name = "news_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tags> tags;
}
