package com.carebridge.carebridge_api.core.dto;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatchOperation {

    public enum Operation {
        REPLACE, ADD, REMOVE, COPY, MOVE, TEST
    }

    private Operation op;
    private String path;
    private Object value;
    private String from; // Used for copy and move operations

    // Convenience constructors
    public PatchOperation(Operation op, String path, Object value) {
        this.op = op;
        this.path = path;
        this.value = value;
    }
}
