"use client";
import AppLogo from "@/components/app_logo";
import { loginService } from "@/lib/api/auth";
import { useAuthStore } from "@/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Mail, Send, Visibility } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openForm, setOpenForm] = useState(false);

    const { login, setLoading, setLogout } = useAuthStore.getState();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await loginService(email, password);
            // @ts-ignore
            if (res.status === 200) {
                // @ts-ignore
                const data = await res.json();
                login(data.user, data.accessToken, data.refreshToken);
                redirect("/dashboard");
            } else {
                // @ts-ignore
                console.error("Login failed:", res.statusText);
            }
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setLoading(false);
        }
    };

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
                        Enter a your email address to send the OTP.
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
                    <Button type="submit" endIcon={<Send />} variant="contained">Send</Button>
                </DialogActions>
            </Dialog>
        );
    };

    return (
        <>
            <div className="flex flex-col gap-2 mb-10 items-center md:items-start">
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
                <AppButton variant="text" isFitParent onClick={() => { setOpenForm(!openForm); }}>
                    Forgot Password ?
                </AppButton>
            </div>
            <AppButton onClick={handleLogin} isFitParent endIcon={<Send />}>
                Login
            </AppButton>
            <Typography variant="body2" className="text-center mt-4">
                Don't have an account?{" "}
                <AppButton variant="text" isFitParent onClick={() => { redirect('/auth/register'); }}>
                    Sign Up
                </AppButton>
            </Typography>
            {renderResendMailForm()}
        </>
    );
}