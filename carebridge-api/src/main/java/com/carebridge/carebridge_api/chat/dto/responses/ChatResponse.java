package com.carebridge.carebridge_api.chat.dto.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatResponse {
    private Long id;
    private Long customerId;
    private Long doctorId;
    private List<ChatHistoryResponse> chatHistories;
}