"use client";
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button, Box, Typography } from "@mui/material";
import { RegEmail } from "./_shared/reg-email";
import { Verification } from "./_shared/verification";
import { RegStatus } from "./_shared/reg-status";
import { RegBiodata } from "./_shared/reg-bio";

export default function RegisterPage() {
    const steps = [
        "Register Email",
        "Verification",
        "Status",
        "Fill Biodata",
        "Welcome",
    ];

    const [activeStep, setActiveStep] = useState(0);
    const [isStepDisable, setIsStepValid] = useState(false);
    const [stepHistory, setStepHistory] = useState<number[]>([0]); // Initialize with the first step

    const handleNext = () => {
        if (isStepDisable) {
            setActiveStep((prevActiveStep) => {
                const nextStep = prevActiveStep + 1;
                setStepHistory((prevHistory) => [...prevHistory, nextStep]); // Add to history
                return nextStep;
            });

            // Disable "Next" button for the next step until it's valid
            setIsStepValid(false);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            const prevStep = prevActiveStep - 1;
            setStepHistory((prevHistory) => prevHistory.slice(0, -1)); // Remove last step from history
            return prevStep;
        });

        // Enable "Next" button for the previous step
        setIsStepValid(true);
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
        <>
            <Typography variant="body1" sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}>
                Follow the steps to register
            </Typography>
            <Box
                className="flex flex-col gap-4 h-full"
                sx={{
                    px: { xs: 2, sm: 0 }, // Add padding for mobile
                }}
            >
                {/* Stepper */}
                <Stepper
                    activeStep={activeStep}
                    orientation="horizontal"
                    sx={{
                        flexDirection: { xs: "column", sm: "row" }, // Stack steps vertically on mobile
                        alignItems: { xs: "flex-start", sm: "center" },
                    }}
                >
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel
                                onClick={() => {
                                    /* Prevent navigating to future steps */
                                }}
                                sx={{
                                    cursor: "pointer",
                                    "& .MuiStepLabel-label": {
                                        fontSize: { xs: "0.75rem", sm: "inherit" }, // Smaller font size for mobile
                                    },
                                }}
                            >
                                <Typography variant="caption">{label}</Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Step Content */}
                <div className="grow flex flex-col justify-center h-full">
                    {renderStepContent(activeStep)}
                </div>

                {/* Navigation Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" }, // Stack buttons vertically on mobile
                        justifyContent: { sm: "space-between" },
                        gap: { xs: 2, sm: 0 }, // Add spacing between buttons on mobile
                        mt: 2,
                    }}
                >
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        color="inherit"
                        sx={{
                            width: { xs: "100%", sm: "auto" }, // Full width for mobile
                        }}
                    >
                        Back
                    </Button>
                    {activeStep < steps.length - 1 ? (
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            disabled={!isStepDisable || activeStep === steps.length - 1}
                            sx={{
                                width: { xs: "100%", sm: "auto" }, // Full width for mobile
                            }}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => alert("Process Complete!")}
                            sx={{
                                width: { xs: "100%", sm: "auto" }, // Full width for mobile
                            }}
                        >
                            Finish
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
}