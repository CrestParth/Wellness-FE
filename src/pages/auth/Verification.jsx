import {useEffect,useState} from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Box, Card, Typography, Button, FormControl, InputLabel, FormHelperText, CircularProgress } from "@mui/material";
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import logo3 from "../../assets/images/logo2.svg";
import { useVerifyOtp ,useResendVerifyOtp} from "../../Api/Api"; // create this API hook
import * as Yup from "yup";

const otpValidation = Yup.object({
    otp: Yup.string()
        .required("OTP is required")
        .min(4, "Invalid OTP"),
});

const Verification = () => {
    const nav = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [timer, setTimer] = useState(30);

    // If user directly opens page
    if (!email) {
        nav("/");
        return null;
    }

    const onError = (error) => {
        toast.error(error?.message || "OTP verification failed");
    };

    const onSuccess = (res) => {
        toast.success("Verification successful!");
        localStorage.clear();
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("userID", res.data.user.id);
        localStorage.setItem("userName", res.data.user.firstName);
        localStorage.setItem("role", res.data.user.role);
        localStorage.setItem("profileImg", res.data.user.profileImage)
        nav("/home");
    };

    const verifyFn = useVerifyOtp(onSuccess, onError);

    const resendSuccess = () => {
        toast.success("OTP resent successfully");
        setTimer(30);
    };

    const resendError = () => {
        toast.error("Failed to resend OTP");
    };

    const resendFn = useResendVerifyOtp(resendSuccess, resendError);

      // countdown
      useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: otpValidation,
        onSubmit: (values) => {
            verifyFn.mutate({
                email,
                otp: values.otp,
            });
        },
    });

    return (
        <Box
            sx={{
                minHeight: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "var(--Blue)",
                p: 3,
            }}
        >
            <Card sx={{ p: 3, borderRadius: 3, boxShadow: 3, maxWidth: 500, width: "100%" }}>
                
                <Box sx={{ textAlign: "center" }}>
                    <img src={logo3} alt="logo" style={{ width: "20%" }} />
                </Box>

                <Typography align="center" sx={{ color: "#878787", mb: 2 }}>
                    Enter OTP sent to
                </Typography>

                <Typography align="center" sx={{ fontWeight: 600, mb: 3 }}>
                    {email}
                </Typography>

                <form onSubmit={formik.handleSubmit}>

                    {/* OTP */}
                    <FormControl variant="standard" fullWidth sx={{ mb: 3 }}>
                        <InputLabel shrink sx={{ fontSize: "1.3rem", fontWeight: 500 }}>
                            OTP
                        </InputLabel>

                        <BootstrapInput
                            name="otp"
                            placeholder="Enter OTP"
                            value={formik.values.otp}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.otp && (
                            <FormHelperText error>
                                {formik.errors.otp}
                            </FormHelperText>
                        )}
                    </FormControl>

                    <Button
                        fullWidth
                        type="submit"
                        disabled={verifyFn.isPending}
                        sx={{
                            bgcolor: "var(--Blue)",
                            fontWeight: 700,
                            borderRadius: 2,
                            py: 1.5,
                            color: "white",
                            "&:hover": { bgcolor: "var(--Blue)" },
                        }}
                    >
                        {verifyFn.isPending ? (
                            <CircularProgress size={22} sx={{ color: "white" }} />
                        ) : (
                            "Verify OTP"
                        )}
                    </Button>

                    {/* Resend OTP */}
                    <Button
                        fullWidth
                        sx={{ mt: 2,color:'black' }}
                        disabled={timer > 0 || resendFn.isPending}
                        onClick={() => resendFn.mutate(email)}
                    >
                        {resendFn.isPending
                            ? "Sending..."
                            : timer > 0
                                ? `Resend OTP in ${timer}s`
                                : "Resend OTP"}
                    </Button>
                </form>
            </Card>
        </Box>
    );
};

export default Verification;