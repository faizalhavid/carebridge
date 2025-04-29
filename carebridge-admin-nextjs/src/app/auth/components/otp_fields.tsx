import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";

interface OtpFieldsProps {
    length?: number;
    value: string;
    onChange: (otp: string) => void;
    isDisabled?: boolean;
}

export default function OtpFields({
    length = 6,
    value,
    onChange,
    isDisabled = false,
}: OtpFieldsProps) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (digit: string, index: number) => {
        if (!/^\d*$/.test(digit)) return;

        const otpArray = value.split("");
        otpArray[index] = digit;
        const newOtp = otpArray.join("");
        onChange(newOtp);


        if (digit && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace") {
            if (value[index] === "" && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (event.key === "ArrowRight" && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pastedData = event.clipboardData.getData("text").slice(0, length);
        if (/^\d+$/.test(pastedData)) {
            onChange(pastedData);
            pastedData.split("").forEach((digit, idx) => {
                if (inputRefs.current[idx]) {
                    inputRefs.current[idx]!.value = digit;
                }
            });
        }
    };

    return (
        <Box display="flex" gap={1}>
            {Array.from({ length }).map((_, index) => (
                <TextField
                    key={index}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                    value={value[index] || ""}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e as React.KeyboardEvent<HTMLInputElement>, index)}
                    onPaste={handlePaste}
                    variant="outlined"
                    size="small"
                    inputProps={{
                        maxLength: 1,
                        style: { textAlign: "center" },
                    }}
                    disabled={isDisabled}
                />
            ))}
        </Box>
    );
}