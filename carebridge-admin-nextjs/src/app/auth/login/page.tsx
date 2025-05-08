"use client";
import AppLogo from "@/components/app_logo";
import AuthService from "@/lib/api/auth-service";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Facebook, Google, Mail, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validations/auth.schema";
import { format } from "node:path";

export default function LoginPage() {
    const [openForm, setOpenForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const authState = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "nurfaizal966@gmail.com",
            password: "",
        },
    });


    const handleLogin = async (data: { email: string; password: string }) => {
        authState.setLoading(true);
        console.log("authState.isloading from component", authState.isLoading);
        try {
            const res = await AuthService.login(data.email, data.password);
            authState.login(res.data.user, res.data.accessToken, res.data.refreshToken);
            redirect("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            authState.setLoading(false);
            console.log("authState.isloading from component", authState.isLoading);
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
            <form onSubmit={handleSubmit(handleLogin)} noValidate className="flex flex-col gap-4">
                <p>Please login to continue</p>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            type="email"
                            label="Email Address"
                            helperText={errors.email?.message || "Enter a valid email"}
                            isRequired
                            suffix={<Mail sx={{ mr: 1 }} />}
                            isError={!!errors.email}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            type="password"
                            label="Password"
                            helperText={errors.password?.message || "Enter your password"}
                            isError={!!errors.password}
                            suffix={
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Visibility /> : <VisibilityOff color="primary" />}
                                </IconButton>
                            }
                        />
                    )}
                />
                <div className="flex flex-row justify-end gap-2 mt-2 mb-4">
                    <AppButton variant="text" onClick={() => { setOpenForm(!openForm); }}>
                        Forgot Password ?
                    </AppButton>
                </div>
                <AppButton
                    type="submit"
                    isDisabled={authState.isLoading}
                    isFitParent
                    endIcon={authState.isLoading && <CircularProgress color="inherit" size={16} />}
                >
                    Login
                </AppButton>
            </form>

            <Typography variant="body2" className="text-center mt-4">
                Don't have an account?{" "}
                <AppButton variant="text" isFitParent onClick={() => { redirect('/auth/register'); }}>
                    Sign Up
                </AppButton>
            </Typography>
            {/* Social Login */}
            <div className="flex flex-row justify-center gap-2 mt-4 mb-4">
                <IconButton >
                    <Google color="inherit" />
                </IconButton>
                <IconButton >
                    <Facebook color="inherit" />
                </IconButton>
            </div>

            {renderResendMailForm()}

        </>
    );
}