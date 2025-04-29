import React, { ReactNode, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface AppTextFieldProps {
    variant?: "outlined" | "filled" | "standard";
    sizes?: "small" | "medium";
    type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week";
    label?: string;
    helperText?: string;
    suffix?: ReactNode;
    prefix?: ReactNode;
    validator?: (value: string) => boolean;
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
    validator,
    isDisabled = false,
    isRequired = false,
    isError = false,
    isReadOnly = false,
    value,
    defaultValue,
    onChange,
    onBlur,
}: AppTextFieldProps) {
    const [error, setError] = useState<boolean>(isError);

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        if (validator) {
            const isValid = validator(event.target.value);
            setError(!isValid);
        }
        if (onBlur) {
            onBlur(event);
        }
    };

    return (
        <TextField
            variant={variant}
            size={sizes}
            type={type}
            label={label}
            helperText={error ? "Invalid input" : helperText}

            error={error}
            disabled={isDisabled}
            required={isRequired}
            InputProps={{
                readOnly: isReadOnly,
                startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
                endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
            }}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={handleBlur}
            fullWidth
        />
    );
}