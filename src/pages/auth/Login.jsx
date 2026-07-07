import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidation } from "../../common/FormValidation";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BootstrapInput } from '../../common/custom/BootstrapInput'
import { useLogin } from "../../Api/Api";
import { CircularProgress } from "@mui/material";

import { Box, Card, Typography, TextField, Button, IconButton, InputAdornment, FormControl, InputLabel, FormHelperText } from "@mui/material";

import logo3 from "../../assets/images/logo2.svg";

const Login = () => {
    const nav = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
            // fcm_token: "fcm_token",
        },
        validationSchema: loginValidation,
        onSubmit: (values) => loginfn.mutate(values),
    });

    const onError = (error) => {
        toast.error(error?.message || "Something went wrong");
    };

    const onSuccess = (res) => {
        toast.success("Logged In successfully.");
        // if OTP required
        nav("/verification", { state: { email: res.data.email, otp: res.data.otp } });

    };

    const loginfn = useLogin(onSuccess, onError);

    return (
        <Box
            sx={{
                minHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "var(--Blue)",
                backgroundPosition: "center",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                p: 3
            }}
        >
            <Card
                sx={{
                    p: 3,
                    borderRadius: 3,
                    boxShadow: 3,
                    maxWidth: 500,
                    width: "100%",
                }}
            >
                <Box sx={{ textAlign: "center" }}>
                    <img src={logo3} alt="logo" style={{ width: "20%" }} />
                </Box>

                <Typography
                    variant="body1"
                    align="center"
                    sx={{ color: "#878787", fontWeight: 400, mb: 3 }}
                >
                    Log in to your account.
                </Typography>

                <form onSubmit={loginForm.handleSubmit}>
                    {/* Email */}
                    <FormControl variant="standard" fullWidth sx={{ mb: 2 }}>
                        <InputLabel shrink htmlFor="email" sx={{ fontSize: '1.3rem', fontWeight: 500, color: 'rgba(0, 0, 0, 0.8)', '&.Mui-focused': { color: 'black' } }}>
                            Email
                        </InputLabel>
                        <BootstrapInput
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={loginForm.values.email}
                            onChange={loginForm.handleChange}
                        />
                        {loginForm.touched.email && <FormHelperText error>{loginForm.errors.email}</FormHelperText>}
                    </FormControl>

                    {/* Password */}
                    <FormControl variant="standard" fullWidth sx={{ mb: 2, position: 'relative' }}>
                        <InputLabel shrink htmlFor="password" sx={{ fontSize: '1.3rem', fontWeight: 500, color: 'rgba(0, 0, 0, 0.8)', '&.Mui-focused': { color: 'black' } }}>
                            Password
                        </InputLabel>
                        <BootstrapInput
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginForm.values.password}
                            onChange={loginForm.handleChange}

                        />

                        {loginForm.touched.password && <FormHelperText error>{loginForm.errors.password}</FormHelperText>}
                    </FormControl>
                    <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            right: 8,
                            top: '70%',
                            transform: 'translateY(-50%)',
                            padding: 0,
                            zIndex: 2
                        }}
                        tabIndex={-1}
                    >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </IconButton>

                    {/* Submit Button */}
                    <Button
                        fullWidth
                        type="submit"
                        disabled={loginfn.isPending}
                        sx={{
                            bgcolor: "var(--Blue)",
                            fontWeight: 700,
                            borderRadius: 2,
                            py: 1.5,
                            color: "white",
                            "&:hover": { bgcolor: "var(--Blue)" },
                            opacity: loginfn.isPending ? 0.8 : 1,
                        }}
                    >
                        {loginfn.isPending ? (
                            <CircularProgress size={22} sx={{ color: "white" }} />
                        ) : (
                            "Log In"
                        )}
                    </Button>

                </form>
            </Card>
        </Box>

    );
};

export default Login