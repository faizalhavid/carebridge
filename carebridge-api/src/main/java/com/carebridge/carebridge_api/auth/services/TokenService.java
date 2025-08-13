package com.carebridge.carebridge_api.auth.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carebridge.carebridge_api.auth.dto.requests.TokenRequest;
import com.carebridge.carebridge_api.auth.dto.responses.TokenResponse;
import com.carebridge.carebridge_api.auth.mappers.TokenMapper;
import com.carebridge.carebridge_api.auth.models.Token;
import com.carebridge.carebridge_api.auth.repositories.TokenRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenRepository tokenRepository;
    private final TokenMapper tokenMapper;

    public Page<TokenResponse> getAllTokens(Pageable pageable) {
        return tokenRepository.findAll(pageable)
                .map(tokenMapper::toResponse);
    }

    public Optional<TokenResponse> getTokenById(Long id) {
        return tokenRepository.findById(id)
                .map(tokenMapper::toResponse);
    }

    public TokenResponse saveToken(TokenRequest tokenRequest) {
        Token token = tokenMapper.toEntity(tokenRequest);
        token = tokenRepository.save(token);
        return tokenMapper.toResponse(token);
    }

    public List<TokenResponse> saveTokens(List<TokenRequest> tokenRequests) {
        List<Token> tokens = tokenRequests.stream()
                .map(tokenMapper::toEntity)
                .collect(Collectors.toList());
        List<Token> savedTokens = tokenRepository.saveAll(tokens);
        return savedTokens.stream()
                .map(tokenMapper::toResponse)
                .collect(Collectors.toList());
    }

    public Optional<TokenResponse> updateToken(Long id, TokenRequest tokenRequest) {
        return tokenRepository.findById(id)
                .map(existingToken -> {
                    tokenMapper.patch(tokenRequest, existingToken);
                    Token updatedToken = tokenRepository.save(existingToken);
                    return tokenMapper.toResponse(updatedToken);
                });
    }

    public void deleteToken(Long id) {
        // Todo: Implement to update base entity (soft delete)
        tokenRepository.deleteById(id);
    }

    public void deleteTokens(List<Long> ids) {
        // Todo: Implement to update base entity (soft delete)
        tokenRepository.deleteAllById(ids);
    }

}
