import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

import {
    Box,
    Card,
    Typography,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";

import { BootstrapInput } from "../common/custom/BootstrapInput";
import logo3 from "../assets/images/logo2.svg";
import * as Yup from "yup";

const validationSchema = Yup.object({
    password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

const ResetPassword = () => {
    const nav = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);

                await axios.post("https://sweatscout.app/api/v1/auth/reset-password", {
                    token,
                    password: values.password,
                    // confirmPassword: values.confirmPassword
                });

                toast.success("Password reset successfully");
                nav("/login");
            } catch (err) {
                toast.error(
                    err?.response?.data?.message || "Reset failed"
                );
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <Box
            sx={{
                minHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "black",
                p: 3,
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
                {/* Logo */}
                <Box sx={{ textAlign: "center" }}>
                    <img src={logo3} alt="logo" style={{ width: "20%" }} />
                </Box>

                {/* Title */}
                <Typography
                    align="center"
                    sx={{ color: "#878787", mb: 3 }}
                >
                    Reset your password
                </Typography>

                <form onSubmit={formik.handleSubmit}>
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
                            value={formik.values.password}
                            onChange={formik.handleChange}

                        />
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
                        {formik.touched.password && <FormHelperText error>{formik.errors.password}</FormHelperText>}
                    </FormControl>

                    {/* Confirm Password */}
                    <FormControl variant="standard" fullWidth sx={{ mb: 2, position: 'relative' }}>
                        <InputLabel shrink htmlFor="confirmPassword" sx={{ fontSize: '1.3rem', fontWeight: 500, color: 'rgba(0, 0, 0, 0.8)', '&.Mui-focused': { color: 'black' } }}>
                            Confirm Password
                        </InputLabel>
                        <BootstrapInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirm ? "text" : "password"}
                            placeholder="Enter your password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}

                        />
                        <IconButton
                            onClick={() => setShowConfirm(!showConfirm)}
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
                            {showConfirm ? <FaEye /> : <FaEyeSlash />}
                        </IconButton>
                        {formik.touched.confirmPassword && <FormHelperText error>{formik.errors.confirmPassword}</FormHelperText>}
                    </FormControl>

                    {/* Submit */}
                    <Button
                        fullWidth
                        type="submit"
                        disabled={loading}
                        sx={{
                            bgcolor: "var(--Blue)",
                            fontWeight: 700,
                            borderRadius: 2,
                            py: 1.5,
                            color: "white",
                            "&:hover": { bgcolor: "var(--Blue)" },
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={22} sx={{ color: "white" }} />
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            </Card>
        </Box>
    );
};

export default ResetPassword;