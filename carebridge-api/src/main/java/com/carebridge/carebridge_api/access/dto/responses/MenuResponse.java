package com.carebridge.carebridge_api.access.dto.responses;

import java.util.List;

public record MenuResponse(
                Long id,
                String name,
                String url,
                Long parentId,
                List<Long> childrenIds,
                String bigIcon,
                String smallIcon) {
}
