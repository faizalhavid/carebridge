import React, { ReactNode, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";

interface AppTextFieldProps {
    id?: string;
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
    multiline?: boolean;
    isReadOnly?: boolean;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export function AppTextField({
    id,
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
    multiline = false,
    isReadOnly = false,
    value,
    defaultValue,
    onChange,
    onBlur,
}: AppTextFieldProps) {
    const [localState, setLocalState] = useState({
        helperText: helperText || "",
        isError: isError || false,
    });
    return (
        <TextField
            variant={variant}
            size={sizes}
            type={type}
            label={label}
            helperText={localState.helperText}
            error={localState.isError}
            disabled={isDisabled}
            required={isRequired}
            slotProps={{
                input: {
                    readOnly: isReadOnly,
                    startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
                    endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
                },
            }}
            onCopy={(e) => {
                type === "password" && e.preventDefault();
                setLocalState((prev) => ({
                    ...prev,
                    isError: true,
                    helperText: "Copying is not allowed for password fields.",
                }));
            }}
            onCut={(e) => {
                type === "password" && e.preventDefault();
                setLocalState((prev) => ({
                    ...prev,
                    isError: true,
                    helperText: "Cutting is not allowed for password fields.",
                }));
            }}
            onPaste={(e) => {
                type === "password" && e.preventDefault();
                setLocalState((prev) => ({
                    ...prev,
                    isError: true,
                    helperText: "Pasting is not allowed for password fields.",
                }));
            }}
            value={value}
            multiline={multiline}
            rows={multiline ? 4 : 1}
            defaultValue={defaultValue}
            onChange={onChange}
            onBlur={onBlur}
            id={id}
            fullWidth
        />
    );
}