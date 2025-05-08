"use client";
import AppLogo from "@/components/app_logo";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";

export default function RegisterPage() {
    const [formStateValue, setFormStateValue] = useState({
        email: "",
        password: "",
    });
    const steps = ["Enter Email", "Set Password", "Review & Submit"];

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepOptional = (step: number) => step === 1;

    const isStepSkipped = (step: number) => skipped.has(step);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Box>
                        <Typography>Enter your email address:</Typography>
                        <AppTextField
                            variant="outlined"
                            sizes="small"
                            type="email"
                            label="Email Address"
                            value={formStateValue.email}
                            onChange={(e) =>
                                setFormStateValue({ ...formStateValue, email: e.target.value })
                            }
                        />
                    </Box>
                );
            case 1:
                return (
                    <Box>
                        <Typography>Set your password:</Typography>
                        <AppTextField
                            variant="outlined"
                            sizes="small"
                            type="password"
                            label="Password"
                            value={formStateValue.password}
                            onChange={(e) =>
                                setFormStateValue({ ...formStateValue, password: e.target.value })
                            }
                        />
                    </Box>
                );
            case 2:
                return (
                    <Box>
                        <Typography>Review your information:</Typography>
                        <Typography>Email: {formStateValue.email}</Typography>
                        <Typography>Password: {formStateValue.password}</Typography>
                        <AppButton
                            text="Submit"
                            onClick={() => alert("Form submitted!")}
                        />
                    </Box>
                );
            default:
                return "Unknown step";
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 mb-10">
                <AppLogo size="large" />
                <p>Welcome to CareBridge</p>
            </div>

            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Box sx={{ flex: "1 1 auto" }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box sx={{ mt: 2, mb: 1 }}>{renderStepContent(activeStep)}</Box>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </>
    );
}