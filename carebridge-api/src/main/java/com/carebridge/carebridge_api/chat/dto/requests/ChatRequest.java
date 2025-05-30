package com.carebridge.carebridge_api.chat.dto.requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRequest {

    @NotNull(message = "Customer ID cannot be null")
    private Long customerId;

    @NotNull(message = "Doctor ID cannot be null")
    private Long doctorId;

    @Valid
    @Size(min = 1, message = "At least one chat history is required")
    private List<ChatHistoryRequest> customerChatHistorys;
}