import React, { ReactNode } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface AppTextFieldProps {
    variant?: "outlined" | "filled" | "standard";
    sizes?: "small" | "medium";
    type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week";
    label?: string;
    helperText?: string | undefined;
    suffix?: ReactNode;
    prefix?: ReactNode;
    isDisabled?: boolean;
    isRequired?: boolean;
    isError?: boolean;
    isReadOnly?: boolean;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function AppTextField({
    variant = "outlined",
    sizes = "medium",
    type = "text",
    label,
    helperText,
    suffix,
    prefix,
    isDisabled = false,
    isRequired = false,
    isError = false,
    isReadOnly = false,
    value,
    defaultValue,
    onChange,
    onBlur,
}: AppTextFieldProps) {
    return (
        <TextField
            variant={variant}
            size={sizes}
            type={type}
            label={label}
            helperText={helperText}
            error={isError}
            disabled={isDisabled}
            required={isRequired}
            slotProps={{
                input: {
                    readOnly: isReadOnly,
                    startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
                    endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
                },
            }}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            fullWidth
        />
    );
}