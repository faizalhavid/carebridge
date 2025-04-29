"use client";
import AppLogo from "@/components/app_logo";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Mail, Visibility } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useState } from "react";


export default function RegisterPage() {
    const [formStateValue, setFormStateValue] = useState({
        email: "",
        password: "",
    });



    return (
        <>

            <div className="flex flex-col gap-2 mb-10">
                <AppLogo size="large" />
                <p>Welcome to CareBridge</p>
            </div>
            <AppTextField
                variant="outlined"
                sizes="small"
                type="email"
                label="Email Address"
                helperText="Enter a valid email to next step"
                validator={(value) => value.includes("@")}
                isRequired
                value={formStateValue.email}
                suffix={<Mail sx={{ mr: 1 }} />}
                onChange={(e) => setFormStateValue({ ...formStateValue, email: e.target.value })}
            />

            {/* <div className="flex flex-row justify-end gap-2 mt-2 mb-4">
                <AppButton variant="text" isFitParent>
                    Forgot Password ?
                </AppButton>
            </div> */}
            <AppButton>
                Register
            </AppButton>
            <Typography variant="body2" className="text-center mt-4">
                Already have an account?{" "}
                <AppButton variant="text" isFitParent>
                    Sign In
                </AppButton>
            </Typography>
        </>
    );
}