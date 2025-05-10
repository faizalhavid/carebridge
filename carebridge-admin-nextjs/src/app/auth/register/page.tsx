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
            <Typography variant="body1" sx={{ mb: 2 }}>Follow the steps to register</Typography>
            <Box className="flex flex-col gap-4 h-full">
                {/* Stepper */}
                <Stepper activeStep={activeStep}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel
                                onClick={() => {
                                    /*                                     const stepIndex = steps.indexOf(label);
                                                                        if (stepIndex > Math.max(...stepHistory)) {
                                                                            return; // Prevent navigating to future steps
                                                                        }
                                                                        setActiveStep(stepIndex);
                                                                        setStepHistory((prevHistory) => [...prevHistory, stepIndex]); // Add to history
                                    
                                                                        // Enable "Next" button only if the step is valid
                                                                        setIsStepValid(stepIndex <= Math.max(...stepHistory)); */
                                }}
                            >
                                <Typography variant="caption">{label}</Typography>
                            </StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {/* Step Content */}
                <div className="grow my-5">
                    {renderStepContent(activeStep)}
                </div>

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
                        <Button
                            onClick={handleNext}
                            variant="contained"
                            disabled={!isStepDisable || activeStep === steps.length - 1}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button variant="contained" onClick={() => alert("Process Complete!")}>
                            Finish
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
}