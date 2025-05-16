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

const regBiodataSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    address: yup.string().required("Address is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

export const RegBiodata: React.FC<RegisterPageProps> = ({
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
        resolver: yupResolver(regBiodataSchema),
        defaultValues: {
            email: "nurfaizal966@gmail.com",
            name: "",
            address: "",
            password: "",
        },
    });

    const handleRegBiodata = (data: any) => {
    }



    return (
        <>
            <form onSubmit={handleSubmit(handleRegBiodata)} noValidate className="flex flex-col gap-4">

                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            label="Name"
                            helperText={errors.name?.message || "Enter your name"}
                            isRequired
                            value={formStateValue.name}
                            onChange={(e) => setFormStateValue({ ...formStateValue, name: e.target.value })}
                        />
                    )}
                />

                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            label="Address"
                            helperText={errors.address?.message || "Enter your address"}
                            isRequired
                            value={formStateValue.address}
                            onChange={(e) => setFormStateValue({ ...formStateValue, address: e.target.value })}
                        />
                    )}
                />

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

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            helperText={errors.password?.message || "Enter your name"}
                            isRequired
                            value={formStateValue.password}
                            onChange={(e) => setFormStateValue({ ...formStateValue, password: e.target.value })}
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