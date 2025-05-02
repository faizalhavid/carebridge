"use client";
import AppLogo from "@/components/app_logo";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import OtpFields from "../_components/otp_fields";
import { AppButton } from "@/themes/mui_components/app_button";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Mail, Send } from "@mui/icons-material";

export default function VerificationPage() {
    const searchParams = useSearchParams();
    const otpFromQuery = searchParams.get("otp") || "";
    const [userInputOTP, setUserInputOTP] = useState(otpFromQuery);
    const [timeLeft, setTimeLeft] = useState(5);
    const [isResendDisabled, setIsResendDisabled] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [userResendMailField, setUserResendMailField] = useState("");

    function handleOtpChange(otp: string) {
        setUserInputOTP(otp);
        console.log("OTP changed:", otp);
    }

    function handleResendOtp() {
        console.log("Resending OTP...");
        setTimeLeft(60);
        setIsResendDisabled(true);
        setOpenForm(!openForm);
    }

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else {
            setIsResendDisabled(false);
        }
    }, [timeLeft]);

    const renderResendMailForm = () => {
        const handleClose = () => setOpenForm(false);

        return (
            <Dialog
                open={openForm}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email as string;
                            console.log("Resend OTP to:", email);
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Resend OTP</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter a valid email address to resend the OTP.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Send</Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <>
            <div className="flex flex-col gap-2 mb-10">
                <AppLogo size="large" />
                <Typography variant="h6" textAlign="center">
                    Input OTP to verify your account
                </Typography>
            </div>
            <OtpFields length={6} onChange={handleOtpChange} value={userInputOTP} />
            <AppButton
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
                onTap={() => console.log("OTP verified")}
            >
                Verify OTP
            </AppButton>
            <Typography variant="body2" textAlign="center" sx={{ mt: 2 }}>
                {isResendDisabled
                    ? `Resend OTP in ${timeLeft} seconds`
                    : "Didn't receive the OTP?"}
            </Typography>
            <AppButton
                variant="text"
                size="small"
                fullWidth
                sx={{ mt: 1 }}
                onTap={handleResendOtp}
                isDisabled={isResendDisabled}
            >
                Resend OTP
            </AppButton>
            {
                renderResendMailForm()
            }
        </>
    );
}