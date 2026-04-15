import { Box, Card, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
    const nav = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "black",
                p: 2,
            }}
        >
            <Card
                sx={{
                    p: 4,
                    borderRadius: 3,
                    textAlign: "center",
                    maxWidth: 420,
                    width: "100%",
                }}
            >
                {/* ✅ Icon */}
                <CheckCircleIcon
                    sx={{ fontSize: 70, color: "#22c55e", mb: 2 }}
                />

                {/* ✅ Title */}
                <Typography variant="h5" fontWeight={700} mb={1}>
                    Password Reset Successful
                </Typography>

                {/* ✅ Subtitle */}
                <Typography sx={{ color: "#666", mb: 3 }}>
                    Your password has been updated successfully. You can now log in with your new password.
                </Typography>
            </Card>
        </Box>
    );
};

export default ResetSuccess;