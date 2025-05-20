"use client";
import AppLogo from "@/components/app_logo";
import AuthService from "@/lib/api/auth-service";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Facebook, Google, Mail, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/validations/auth.schema";

export default function LoginPage() {
    const [openForm, setOpenForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const authState = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "nurfaizal966@gmail.com",
            password: "Barakadut123@",
        },
    });


    const handleLogin = async (data: { email: string; password: string }) => {
        setIsLoading(true);
        try {
            const res = await AuthService.login(data.email, data.password);
            authState.login(res.data.user, res.data.accessToken);
            // router.push("/dashboard");
        } catch (error) {
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
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
            <Typography variant="body1" sx={{ mb: 4 }}>Please login to continue</Typography>
            <form onSubmit={handleSubmit(handleLogin)} noValidate className="flex flex-col gap-5 my-2">
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
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            helperText={errors.password?.message || "Enter your password"}
                            isError={!!errors.password}
                            suffix={
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <Visibility color="primary" /> : <VisibilityOff />}
                                </IconButton>
                            }
                        />
                    )}
                />
                <div className="flex flex-row justify-end gap-2 mb-4">
                    <AppButton variant="text" onClick={() => { setOpenForm(!openForm); }}>
                        Forgot Password ?
                    </AppButton>
                </div>
                <AppButton
                    type="submit"
                    isDisabled={isLoading}
                    isFitParent
                    endIcon={isLoading && <CircularProgress color="inherit" size={16} />}
                >
                    Login
                </AppButton>
            </form>



            <Typography variant="body2" className="text-center my-2">
                Don't have an account?
                <AppButton variant="text" onClick={() => { router.push('/auth/register'); }}>
                    Sign Up
                </AppButton>
            </Typography>

            <div className="flex flex-row justify-center gap-2">
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