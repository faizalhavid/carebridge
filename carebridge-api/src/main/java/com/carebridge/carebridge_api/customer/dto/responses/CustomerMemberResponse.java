package com.carebridge.carebridge_api.customer.dto.responses;

public record CustomerMemberResponse(
        Long id,
        Long parentBiodataId,
        Long customerId,
        Long customerRelationId) {
}
