package com.carebridge.carebridge_api.customer.dto.responses;

import java.util.List;

public record CustomerRelationResponse(
        Long id,
        String name,
        List<Long> customerMemberIds) {
}
