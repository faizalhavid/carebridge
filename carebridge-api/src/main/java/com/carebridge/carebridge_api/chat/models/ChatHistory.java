package com.carebridge.carebridge_api.chat.models;

import com.carebridge.carebridge_api.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "t_chat_history")
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistory extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "chat_id")
    @JsonManagedReference
    private Chat chat;

    @Column(name = "chat_content")
    private String chatContent;
}
