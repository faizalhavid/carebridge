package com.carebridge.carebridge_api.auth.controllers;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.carebridge.carebridge_api.auth.dto.requests.TokenRequest;
import com.carebridge.carebridge_api.auth.dto.responses.TokenResponse;
import com.carebridge.carebridge_api.auth.services.TokenService;
import com.carebridge.carebridge_api.core.general_dto.responses.SuccessResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/${env.api.version}/tokens")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class TokenController {

    private final TokenService tokenService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('READ_TOKEN')")
    public ResponseEntity<PagedModel<EntityModel<TokenResponse>>> getAllTokens(Pageable pageable) {
        PagedModel<EntityModel<TokenResponse>> pagedModel = PagedModel.of(
                tokenService.getAllTokens(pageable).getContent().stream()
                        .map(EntityModel::of)
                        .toList(),
                new PagedModel.PageMetadata(pageable.getPageSize(), pageable.getPageNumber(),
                        tokenService.getAllTokens(pageable).getTotalElements(),
                        tokenService.getAllTokens(pageable).getTotalPages()));
        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('READ_TOKEN')")
    public ResponseEntity<SuccessResponse<TokenResponse, Object>> getTokenById(@PathVariable Long id) {
        return tokenService.getTokenById(id)
                .map(token -> ResponseEntity.ok(
                        new SuccessResponse<>(token, "Get token by ID successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_TOKEN')")
    public ResponseEntity<SuccessResponse<TokenResponse, Object>> saveToken(@RequestBody TokenRequest tokenRequest) {
        return ResponseEntity.ok(new SuccessResponse<>(tokenService.saveToken(tokenRequest),
                "Save token successful", 201));
    }

    @PostMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('CREATE_TOKEN')")
    public ResponseEntity<SuccessResponse<List<TokenResponse>, Object>> saveTokens(
            @RequestBody List<TokenRequest> tokenRequests) {
        return ResponseEntity.ok(new SuccessResponse<>(tokenService.saveTokens(tokenRequests),
                "Save tokens successful", 201));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('UPDATE_TOKEN')")
    public ResponseEntity<SuccessResponse<TokenResponse, Object>> updateToken(@PathVariable Long id,
            @RequestBody TokenRequest tokenRequest) {
        return tokenService.updateToken(id, tokenRequest)
                .map(token -> ResponseEntity.ok(
                        new SuccessResponse<>(token, "Update token successful", 200)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_TOKEN')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteToken(@PathVariable Long id) {
        tokenService.deleteToken(id);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete token successful", 200));
    }

    @DeleteMapping("/bulk")
    @PreAuthorize("hasAnyRole('ADMIN', 'ADMIN_CREDENTIALS') or hasAnyAuthority('DELETE_TOKEN')")
    public ResponseEntity<SuccessResponse<Void, Object>> deleteTokens(@RequestBody List<Long> ids) {
        tokenService.deleteTokens(ids);
        return ResponseEntity.ok(new SuccessResponse<>(null, "Delete tokens successful", 200));
    }

}
