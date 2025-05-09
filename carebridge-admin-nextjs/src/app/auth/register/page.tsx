"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
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
    const [isStepDisable, setIsStepValid] = useState(false);
    const handleNext = () => {
        if (isStepDisable) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        if (activeStep === 0) {
            setIsStepValid(false);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <RegEmail activeStep={activeStep} setActiveStep={setActiveStep} />
                );
            case 1:
                return (
                    <Verification activeStep={activeStep} setActiveStep={setActiveStep} />
                );
            case 2:
                return (
                    <RegStatus title="Verification Status" content={<p>Verification in progress...</p>} />
                );
            case 3:
                return (
                    <RegBiodata activeStep={activeStep} setActiveStep={setActiveStep} />
                );
            case 4:
                return (
                    <RegStatus title="Registration Success" content={<p>Registration completed successfully!</p>} />
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
            {/* <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    color="inherit"
                >
                    Back
                </Button>
                {activeStep < steps.length - 1 ? (
                    <Button onClick={handleNext} variant="contained" disabled={!isStepDisable}>
                        Next
                    </Button>
                ) : (
                    <Button variant="contained" onClick={() => alert("Process Complete!")}>
                        Finish
                    </Button>
                )}
            </Box> */}
        </Box>
    );
}