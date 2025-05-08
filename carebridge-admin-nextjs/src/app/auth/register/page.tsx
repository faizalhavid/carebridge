"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Typography, Box } from "@mui/material";
import AppLogo from "@/components/app_logo";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import OtpFields from "../_components/otp_fields";

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
                    <>
                        <AppTextField
                            variant="outlined"
                            sizes="small"
                            type="email"
                            label="Email Address"
                            helperText="Enter a valid email to proceed"
                            isRequired
                            value={formStateValue.email}
                            onChange={(e) => setFormStateValue({ ...formStateValue, email: e.target.value })}
                        />
                    </>
                );
            case 1: // Verify OTP
                return (
                    <>
                        <OtpFields
                            length={6}
                            onChange={(otp) => setFormStateValue({ ...formStateValue, otp })}
                            value={formStateValue.otp}
                        />
                        <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                            Enter the OTP sent to your email.
                        </Typography>
                    </>
                );
            case 2: // Verification Status
                return (
                    <>
                        <Typography variant="body2" textAlign="center">
                            Your verification status will be displayed here.
                        </Typography>
                    </>
                );
            case 3: // Fill Biodata
                return (
                    <>
                        <AppTextField
                            variant="outlined"
                            sizes="small"
                            type="text"
                            label="Full Name"
                            helperText="Enter your full name"
                            isRequired
                            value={formStateValue.name}
                            onChange={(e) => setFormStateValue({ ...formStateValue, name: e.target.value })}
                        />
                        <AppTextField
                            variant="outlined"
                            sizes="small"
                            type="text"
                            label="Address"
                            helperText="Enter your address"
                            isRequired
                            value={formStateValue.address}
                            onChange={(e) => setFormStateValue({ ...formStateValue, address: e.target.value })}
                        />
                    </>
                );
            case 4: // Registration Success
                return (
                    <>
                        <Typography variant="body2" textAlign="center">
                            Congratulations! Your registration is complete.
                        </Typography>
                    </>
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