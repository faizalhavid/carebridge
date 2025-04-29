"use client";
import AppLogo from "@/components/app_logo";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Mail, Visibility } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <div className="flex flex-col gap-2 mb-10">
                <AppLogo size="large" />
                <p>Please login to continue</p>
            </div>
            <AppTextField
                variant="outlined"
                sizes="small"
                type="email"
                label="Email Address"
                helperText="Enter a valid email"
                validator={(value) => value.includes("@")}
                isRequired
                value={email}
                suffix={<Mail sx={{ mr: 1 }} />}
                onChange={(e) => setEmail(e.target.value)}
            />
            <AppTextField
                variant="outlined"
                sizes="small"
                type="password"
                label="Password"
                helperText="Enter your password"
                isRequired
                value={password}
                suffix={<IconButton><Visibility /></IconButton>}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex flex-row justify-end gap-2 mt-2 mb-4">
                <AppButton variant="text" isFitParent>
                    Forgot Password ?
                </AppButton>
            </div>
            <AppButton>
                Login
            </AppButton>
            <Typography variant="body2" className="text-center mt-4">
                Don't have an account?{" "}
                <AppButton variant="text" isFitParent onTap={() => { redirect('/auth/register'); }}>
                    Sign Up
                </AppButton>
            </Typography>
        </>
    );
}