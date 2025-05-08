"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography, Box } from "@mui/material";
import AppLogo from "@/components/app_logo";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import OtpFields from "../_components/otp_fields";
import { RegEmail } from "./_shared/reg-email";
import { Verification } from "./_shared/verification";
import { RegStatus } from "./_shared/reg-status";
import { RegBiodata } from "./_shared/reg-bio";

export default function RegisterPage() {
    const steps = [
        "Register Email",
        "Verify OTP",
        "Verification Status",
        "Fill Biodata",
        "Registration Success",
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [formStateValue, setFormStateValue] = useState({
        email: "",
        otp: "",
        name: "",
        address: "",
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0: // Register Email
                return (
                    <RegEmail />
                );
            case 1: // Verify OTP
                return (
                    <Verification />
                );
            case 2: // Verification Status
                return (
                    <RegStatus />
                );
            case 3: // Fill Biodata
                return (
                    <RegBiodata />
                );
            case 4: // Registration Success
                return (
                    <RegStatus />
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: "100%", maxWidth: "600px", margin: "0 auto", mt: 4 }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step Content */}
            <Box sx={{ mt: 4, mb: 2 }}>
                {renderStepContent(activeStep)}
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    color="inherit"
                >
                    Back
                </Button>
                {activeStep < steps.length - 1 ? (
                    <Button onClick={handleNext} variant="contained">
                        Next
                    </Button>
                ) : (
                    <Button variant="contained" onClick={() => alert("Process Complete!")}>
                        Finish
                    </Button>
                )}
            </Box>
        </Box>
    );
}