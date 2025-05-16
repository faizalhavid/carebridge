"use client";
import AppLogo from "@/components/app_logo";
import { RegisterPageProps } from "@/interfaces/register-page";
import AuthService from "@/lib/api/auth-service";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as yup from "yup";

const regEmailSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
});

export const RegEmail: React.FC<RegisterPageProps> = ({
    activeStep,
    setActiveStep
}) => {

    const [isLoading, setIsLoading] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(regEmailSchema),
        mode: "onChange",
        defaultValues: {
            email: "nurfaizal966@gmail.com",
        },
    });

    const handleRegEmail = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await AuthService.registerEmail(data.email);
            console.log(res.data);
            setActiveStep(activeStep + 1);
        } catch (error) {
            console.error("Register email failed:", error);
        } finally {
            setIsLoading(false);
            // debug
            setActiveStep(activeStep + 1);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(handleRegEmail)} noValidate className="flex flex-col gap-4 h-full bg-amber-300">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            type="email"
                            id="email"
                            label="Email Address"
                            helperText={errors.email?.message || "Enter your email"}
                            isRequired
                            isError={!!errors.email}
                        />
                    )}
                />

                {/* <div className="flex-grow" /> */}

                <AppButton type="submit" variant="contained" size="large" isDisabled={isLoading} endIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : undefined}>
                    Submit
                </AppButton>
            </form>
        </>
    );
}