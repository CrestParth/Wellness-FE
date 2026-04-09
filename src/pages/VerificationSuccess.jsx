import { Box, Typography, Button, Container } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const VerificationSuccess = () => {
    const navigate = useNavigate();

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
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: '500px'
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        p: { xs: 3, md: 5 },
                        borderRadius: 3,
                        background: "white",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        width: "100%",
                    }}
                >
                    {/* Icon */}
                    <CheckCircleIcon
                        sx={{
                            fontSize: 70,
                            color: "#22c55e",
                            mb: 2,
                        }}
                    />

                    {/* Title */}
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            mb: 1,
                            color: "black",
                        }}
                    >
                        Email Verified Successfully!
                    </Typography>

                    {/* Message */}
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: 14,
                            mb: 4,
                        }}
                    >
                        Thank you for verifying your email address. Your account is now active and ready to use.
                    </Typography>

                    {/* Button */}
                    {/* <Button
                        fullWidth
                        onClick={() => navigate("/login")}
                        sx={{
                            background: ' var(--Blue)',
                            color: "white",
                            fontWeight: 600,
                            py: 1.5,
                            borderRadius: "10px",
                            textTransform: "none",
                            "&:hover": {
                                background: "#06b6d4",
                            },
                        }}
                    >
                        Go to Login
                    </Button> */}
                </Box>
            </Box>
        </Box>
    );
};

export default VerificationSuccess;