package com.carebridge.carebridge_api.chat.dto.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatHistoryRequest {

    @NotBlank(message = "Chat content cannot be blank")
    private String chatContent;
}