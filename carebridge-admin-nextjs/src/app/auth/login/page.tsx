"use client";
import { useAuthStore } from "@/lib/stores/auth_store";
import { AppButton } from "@/themes/mui_components/app_button";
import { AppTextField } from "@/themes/mui_components/app_text_field";
import { Facebook, Google, Mail, Send, Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    Alert,
    Snackbar
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { login } from "@/lib/services/apis/auth";
import { LoginRequest } from "@/types/schemas/auth-schema";


const validateEmail = (email: string): string | undefined => {
    if (!email) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Invalid email format";
    return undefined;
};

const validatePassword = (password: string): string | undefined => {
    if (!password) return "Password is required";
    if (password.length < 1) return "Password is required";
    return undefined;
};

export default function LoginPage() {
    const [openForgotPasswordDialog, setOpenForgotPasswordDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();
    const authState = useAuthStore();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginRequest>({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const handleLogin = async (data: LoginRequest) => {
        // Manual validation
        const emailError = validateEmail(data.email);
        const passwordError = validatePassword(data.password);

        if (emailError || passwordError) {
            if (emailError) setError(emailError);
            else if (passwordError) setError(passwordError);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await login(data.email, data.password);

            authState.login(response.data.user, response.data.accessToken);
            setSuccessMessage("Login successful! Redirecting...");

            // Clear the form
            reset();

            // Redirect after a short delay
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);
        } catch (error: any) {
            console.error("Login failed:", error);

            // Handle different types of errors
            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.message) {
                setError(error.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (email: string) => {
        try {
            // TODO: Implement forgot password API call
            console.log("Forgot password for:", email);
            setSuccessMessage("Password reset link sent to your email");
            setOpenForgotPasswordDialog(false);
        } catch (error) {
            setError("Failed to send password reset email");
        }
    };

    const renderForgotPasswordForm = () => {
        const handleClose = () => setOpenForgotPasswordDialog(false);

        return (
            <Dialog
                open={openForgotPasswordDialog}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries(formData.entries());
                            const email = formJson.email as string;
                            handleForgotPassword(email);
                        },
                    },
                }}
            >
                <DialogTitle>Forgot Password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter your email address to receive a password reset link.
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
            <Typography variant="body1" sx={{ mb: 4 }}>
                Please login to continue
            </Typography>

            <form onSubmit={handleSubmit(handleLogin)} noValidate className="flex flex-col gap-5 my-2">
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    }}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"

                            isAutoComplete
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
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 1,
                            message: "Password is required"
                        }
                    }}
                    render={({ field }) => (
                        <AppTextField
                            {...field}
                            variant="outlined"
                            sizes="small"
                            isAutoComplete
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
                    <AppButton
                        variant="text"
                        onClick={() => setOpenForgotPasswordDialog(true)}
                    >
                        Forgot Password?
                    </AppButton>
                </div>

                <AppButton
                    type="submit"
                    isDisabled={isLoading}
                    isFitParent
                    endIcon={isLoading && <CircularProgress color="inherit" size={16} />}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </AppButton>
            </form>

            <Typography variant="body2" className="text-center my-2">
                Don't have an account?
                <AppButton variant="text" onClick={() => router.push('/auth/register')}>
                    Sign Up
                </AppButton>
            </Typography>

            <div className="flex flex-row justify-center gap-2">
                <IconButton aria-label="Login with Google">
                    <Google color="inherit" />
                </IconButton>
                <IconButton aria-label="Login with Facebook">
                    <Facebook color="inherit" />
                </IconButton>
            </div>

            {renderForgotPasswordForm()}

            {/* Error Snackbar */}
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>

            {/* Success Snackbar */}
            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="success" onClose={() => setSuccessMessage(null)}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
}