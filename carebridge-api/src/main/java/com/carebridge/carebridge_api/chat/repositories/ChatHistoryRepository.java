package com.carebridge.carebridge_api.chat.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.carebridge.carebridge_api.chat.models.ChatHistory;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {

}
