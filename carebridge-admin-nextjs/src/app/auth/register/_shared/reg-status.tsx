"use client";
import AppLogo from "@/components/app-logo";
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



import { ReactNode } from "react";

interface RegStatus {
    title: string;
    content: ReactNode;
}

export const RegStatus = ({ title, content }: RegStatus) => {





    return (
        <>
            <p>
                {title}
            </p>
            {content}
        </>
    );
}