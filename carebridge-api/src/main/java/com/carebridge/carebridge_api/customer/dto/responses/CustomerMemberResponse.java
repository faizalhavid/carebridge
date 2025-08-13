package com.carebridge.carebridge_api.customer.dto.responses;

import com.carebridge.carebridge_api.customer.models.Customer;
import com.carebridge.carebridge_api.customer.models.CustomerRelation;

public record CustomerMemberResponse(
        Long id,
        Long parentBiodataId,
        Customer customerId,
        CustomerRelation customerRelation) {
}
