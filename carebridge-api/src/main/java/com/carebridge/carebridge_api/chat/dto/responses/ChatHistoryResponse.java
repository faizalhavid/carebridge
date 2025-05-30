package com.carebridge.carebridge_api.chat.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatHistoryResponse {
    private Long id;
    private String chatContent;
    private LocalDateTime createdAt;
}