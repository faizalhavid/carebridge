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

const regEmailSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});

export const RegEmail: React.FC<RegisterPageProps> = ({
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
        resolver: yupResolver(regEmailSchema),
        defaultValues: {
            email: "nurfaizal966@gmail.com",
        },
    });

    const handleRegEmail = (data: any) => {
    }



    return (
        <>
            <form onSubmit={handleSubmit(handleRegEmail)} noValidate className="flex flex-col gap-4">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            type="email"
                            label="Email Address"
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