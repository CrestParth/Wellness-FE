import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import VibeCard from '../../components/VibeCard'
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
const VibeInfo = () => {
    const [openPopup, setOpenPopup] = useState(null);
    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);
    const vibeData = {
        userName: "Juliana Silva",
        avatar: "/avatar.jpg",
        date: "06 June, 2025",
        note: "FitZone is the best place to achieve my fitness goals...",
        tags: ["Strength", "Yoga", "Fitness"],
        energy: "High",
        pace: "Athletic",
        cueing: "Detailed",
        focus: "Burn",
        music: "Main Character",
        highlights: ["Clear Cues", "Good energy"],
        goodFor: ["Beginners", "High energy"]
    };

    const handleConfirm = () => {
        if (openPopup === "delete") {
            toast.success('Deleted Successfully')
        }
        handleClose()
    }

    return (
        <Box sx={{ p: { xs: 0, sm: 1 } }}>
            <Box
                sx={{
                    backgroundColor: "rgb(253, 253, 253)",
                    p: 3,
                    borderRadius: '10px',
                    boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)",
                    mb: 3
                }}
            >
                <Grid container spacing={3}>

                    <Grid size={12} sx={{ borderBottom: "1px solid #E5E7EB", pb: 1 }}>
                        <Typography variant="h6" fontWeight={600}>
                            Vibe Check Details
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <VibeCard vibe={vibeData} />
                    </Grid>
                    <Grid size={12}>
                        <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                            <Button
                                variant="contained"
                                sx={{ width: 130, height: 48, color: 'white', borderRadius: '10px', backgroundColor: 'red' }}
                                onClick={() => {
                                    handleOpen('delete')
                                }}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <ConfirmationPopUp
                open={openPopup === "delete"}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title="Delete Vibe Check"
                message={`Are you sure you want to permanently delete this vibe check?`}
                BtnText={'Delete'}
                BtnColor="red"
                icon={DeleteConfirm}
            />
        </Box >

    );
};

export default VibeInfo;
