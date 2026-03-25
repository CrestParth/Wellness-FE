import React, { useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import VibeCard from '../../components/VibeCard'
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetVibeById, useDeleteVibe } from '../../Api/Api'
import { useQueryClient } from "@tanstack/react-query";
const VibeInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [openPopup, setOpenPopup] = useState(null);
    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);

    const client = useQueryClient()
    const { data: vibeData } = useGetVibeById(id);

    const getRange = (title) =>
        vibeData.data.describeVibe?.find(v => v.title === title)?.range;
    const getValue = (title) =>
        vibeData.data.describeVibe?.find(v => v.title === title)?.value;

    const formattedVibe = vibeData?.data
        ? {
            userName: `${vibeData.data.user?.firstName || ""} ${vibeData.data.user?.lastName || ""}`.trim(),
            avatar: vibeData.data.user?.profileImage || "",
            date: new Date(vibeData.data.createdAt).toLocaleDateString(),
            note: vibeData.data.vibeText || "",
            tags: vibeData.data.classStyle?.map((c) => c.name) || [],
            energy: getValue("Energy"),
            pace: getValue("Pace"),
            cueing: getValue("Cueing"),
            focus: getValue("Focus"),
            music: getValue("Music"),

            energyRange: getRange("Energy"),
            paceRange: getRange("Pace"),
            cueingRange: getRange("Cueing"),
            focusRange: getRange("Focus"),
            musicRange: getRange("Music"),

            highlights: vibeData.data.vibeTags?.experienceHighlights || [],
            goodFor: vibeData.data.vibeTags?.goodFitFor || []
        }
        : null;

    const handleConfirm = () => {
        if (openPopup === "delete") {
            deleteVibe(id);
        }
        handleClose()
    }

    const { mutate: deleteVibe } = useDeleteVibe(
        () => {
            toast.success("Vibe deleted successfully");
            navigate("/home/vibe");
            client.invalidateQueries(["vibes"], { exact: false });
        },
        (error) => toast.error(error?.message || "Something went Wrong")
    );
    if (!formattedVibe) {
        return (
            <Box p={3}>
                <Typography>No vibe data found</Typography>
            </Box>
        );
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
                        <VibeCard vibe={formattedVibe} />
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
