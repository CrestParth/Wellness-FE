import { Box, Typography, Button, Container } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";

const VerificationError = () => {
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
                    <ErrorOutlineIcon
                        sx={{
                            fontSize: 70,
                            color: "#ef4444",
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
                        Verification Failed
                    </Typography>

                    {/* Message */}
                    <Typography
                        sx={{
                            color: "black",
                            fontSize: 14,
                            mb: 4,
                        }}
                    >
                        We couldn't verify your email address. The link may be invalid or has already expired.
                    </Typography>

                    {/* Button */}
                    {/* <Button
                        fullWidth
                        onClick={() => navigate("/resend-verification")} // 🔁 change if needed
                        sx={{
                            background: ' var(--Blue)',
                            color: "white",
                            fontWeight: 600,
                            py: 1.5,
                            borderRadius: "10px",
                            textTransform: "none",
                            "&:hover": {
                                background: "#dc2626",
                            },
                        }}
                    >
                        Resend Verification Email
                    </Button> */}
                </Box>
            </Box>
        </Box>
    );
};

export default VerificationError;