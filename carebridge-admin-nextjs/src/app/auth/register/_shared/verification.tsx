"use client";
import AppLogo from "@/components/app-logo";
import { RegisterPageProps } from "@/interfaces/register-page";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, CircularProgress, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import * as yup from "yup";
import OtpFields from "../../_components/otp_fields";
import AuthService from "@/lib/api/auth-service";

const verificationSchema = yup.object().shape({
    otp: yup
        .string()
        .required("OTP is required")
        .length(6, "OTP must be exactly 6 characters"),
});

export const Verification: React.FC<any> = ({
    activeStep,
    setActiveStep,
}) => {
    const duration = 60 * 1000;
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const email = (document.getElementById("email") as HTMLInputElement);

    useEffect(() => {
        if (email) {
            if (timeLeft > 0) {
                email.setAttribute("disabled", "true");
                setIsResendDisabled(true);
                const timer = setInterval(() => {
                    setTimeLeft((prev) => prev - 1000);
                }, 1000);

                return () => clearInterval(timer);
            } else {
                email.setAttribute("disabled", "false");
                setIsResendDisabled(false);
            }
        }
    }, [timeLeft]);


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

    const handleVerification = async (data: any) => {
        setIsLoading(true);
        try {
            const res = await AuthService.verification(data.otp, email.value);
            console.log(res.data);
            setActiveStep(activeStep + 1);
        } catch (error) {
            console.error("Verification failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleResendOtp() {
        console.log("Resending OTP...");
        setTimeLeft(60000);
        setIsResendDisabled(true);
        setActiveStep(activeStep - 1);
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
                            value={field.value}
                            isError={!!errors.otp}
                            helperText={errors.otp?.message || "Enter otp"}
                        />
                    )}
                />
                <div className="flex flex-row gap-2 justify-end">
                    <Typography variant="caption" textAlign="center" sx={{ mt: 2 }}>
                        {isResendDisabled
                            ? (<>
                                Resend OTP in
                                <AppButton variant="text" size="small" sx={{ color: "warning.main" }}>
                                    {Math.floor(timeLeft / 1000 / 60)
                                        .toString()
                                        .padStart(2, "0")}:{(Math.floor(timeLeft / 1000) % 60)
                                            .toString()
                                            .padStart(2, "0")}
                                </AppButton>
                            </>)
                            : "Didn't receive the OTP?"}
                    </Typography>
                    <AppButton
                        variant="text"
                        size="small"
                        sx={{ mt: 1, display: isResendDisabled ? "none" : "block" }}
                        onClick={handleResendOtp}
                        isDisabled={isResendDisabled}
                    >
                        Resend OTP
                    </AppButton>
                </div>

                <AppButton type="submit" variant="contained" size="large" isDisabled={isLoading} endIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : undefined}>
                    Submit
                </AppButton>
            </form>
        </>
    );
}