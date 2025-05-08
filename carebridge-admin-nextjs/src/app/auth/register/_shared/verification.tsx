"use client";
import AppLogo from "@/components/app_logo";
import { RegisterPageProps } from "@/interfaces/register-page";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import OtpFields from "../../_components/otp_fields";

const verificationSchema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .length(6, "OTP must be exactly 6 characters"),
});

export const Verification: React.FC<RegisterPageProps> = ({
    formStateValue,
    setFormStateValue,
    activeStep,
    setActiveStep,
    handleNext,
    handleBack,
    handleSkip,
    handleReset,
}) => {

    const [showPassword, setShowPassword] = useState(false);
    const authState = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(verificationSchema),
        defaultValues: {
            otp: "",
        },
    });

    const handleVerification = (data: any) => {
    }



    return (
        <>
            <form onSubmit={handleSubmit(handleVerification)} noValidate className="flex flex-col gap-4">
                <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                        <OtpFields
                            {...field}
                            length={6}

                            helperText={errors.email?.message || "Enter your email"}
                            isRequired
                            value={formStateValue.email}
                            onChange={(e) => setFormStateValue({ ...formStateValue, email: e.target.value })}
                        />
                    )}
                />


                <AppButton type="submit" variant="contained" size="large">
                    Submit Biodata
                </AppButton>
            </form>
        </>
    );
}