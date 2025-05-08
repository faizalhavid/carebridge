"use client";
import AppLogo from "@/components/app_logo";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";



export default function RegisterMail({ formStateValue, setFormStateValue }: { formStateValue: any; setFormStateValue: any }) {

    return (
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
    );
}