import React, { useState } from "react";
import {
    Box, Typography, Button, Grid, FormHelperText, Stack
} from "@mui/material";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import GrayPlus from '../../assets/images/GrayPlus.svg'
import VibeCard from "../../components/VibeCard";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { toast } from "react-toastify";

const UserInformation = () => {
    const [edit, setEdit] = useState(false)
    const [openPopup, setOpenPopup] = useState(null);
    const userForm = useFormik({
        initialValues: {
            name: "Michael Johnson",
            studio: "Iron Core Fitness",
            services: "Strength Training",
            location: ["FitZone", "LifeFitness", "Fitness"],
            email: "michael.johnson@yopmail.com",
            category: ["Strength", "Yoga", "Fitness"],
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
            vibeChecks: [
                {
                    id: 1,
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
                },
                {
                    id: 2,
                    userName: "Jhon Doe",
                    avatar: "/avatar.jpg",
                    date: "08 June, 2025",
                    note: "FitPal is the best place to achieve my fitness goals...",
                    tags: ["Strength", "Yoga", "Fitness"],
                    energy: "High",
                    pace: "Athletic",
                    cueing: "Detailed",
                    focus: "Burn",
                    music: "Main Character",
                    highlights: ["Clear Cues", "Good energy"],
                    goodFor: ["Beginners", "High energy"]
                }
            ]

            // status: 'approved'
        },
        onSubmit: (values) => {
            console.log("Instructor Added (Dummy):", values);
            alert("Instructor added (dummy)");
        },
    });
    const displayField = (label, value) => (
        <Box mb={3}>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}>{label}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
                {value || "-"}
            </Typography>
        </Box>
    );
    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);

    const handleConfirm = () => {
        if (openPopup === "delete") {
            toast.success('Deleted Successfully')
        }
        handleClose()
    }
    return (
        <Box sx={{ p: { xs: 0, sm: 1 } }}>
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", p: 3, borderRadius: '10px', boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mb: 3 }}>
                <form>
                    <Grid container spacing={edit ? 3 : 1}>
                        <Grid size={12} sx={{
                            borderBottom: "1px solid #E5E7EB",
                            display: "inline-block",
                            paddingBottom: "4px",
                            marginBottom: "10px"
                        }}>
                            <Typography variant="h6" gutterBottom fontWeight={600}>
                                User Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Name"
                                    placeholder="Enter Name"
                                    name="name"
                                    formik={userForm}
                                />) : displayField("Name", userForm.values.name)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    formik={userForm}
                                />) : displayField("Email", userForm.values.email)}
                        </Grid>

                        <Grid size={12}>
                            <Grid container gap={3} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 3.7 }}>
                                    <Grid size={{ xs: 12 }}>
                                        <label style={{ marginBottom: '10px', display: 'block', fontWeight: 500 }}>Profile Image</label>
                                        <Box
                                            sx={{
                                                border: '2px dashed #E0E3E7',
                                                borderRadius: '12px',
                                                minHeight: 180,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: edit ? 'pointer' : 'not-allowed',
                                                position: 'relative',
                                                background: '#fafbfc'
                                            }}
                                            component="label"
                                        >
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                name="profile_img"
                                                disabled={!edit}
                                                onChange={e => userForm.setFieldValue('profile_img', e.currentTarget.files[0])}
                                            />
                                            {userForm.values.profile_img instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(userForm.values.profile_img)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : userForm.values.profile_img ? (
                                                <img
                                                    src={userForm.values.profile_img}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {userForm.touched.profile_img && userForm.errors.profile_img && (
                                            <FormHelperText error>{userForm.errors.profile_img}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                {edit ? (
                                    <>
                                        <Button
                                            variant="outlined"
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'black', fontSize: '16px', fontWeight: 400, border: '1px solid #D1D5DB' }}
                                            onClick={() => {
                                                setEdit(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                            onClick={() => {
                                                userForm.handleSubmit()
                                            }}
                                        >
                                            Save
                                        </Button>

                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        sx={{ width: 130, height: 48, color: 'white', borderRadius: '10px', backgroundColor: 'var(--Blue)' }}
                                        onClick={() => setEdit(true)}
                                    >
                                        Edit
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    sx={{ width: 130, height: 48, color: 'white', borderRadius: '10px', backgroundColor: '#F01510' }}
                                    onClick={() => { handleOpen('delete') }}>Delete
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
            <ConfirmationPopUp
                open={openPopup === "delete"}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title="Delete User"
                message={`Are you sure you want to permanently delete this user?`}
                BtnText={'Delete'}
                BtnColor="red"
                icon={DeleteConfirm}
            />
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", p: 4, borderRadius: '10px', boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mb: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                    Vibes given by User
                </Typography>

                {userForm.values?.vibeChecks?.length > 0 ? (
                    <Stack spacing={3} >
                        {userForm.values.vibeChecks.map((vibe, i) => (
                            <Box sx={{
                                borderRadius: 4,
                                p: 3,
                                border: '1px solid black'
                            }}> <VibeCard key={vibe.id || i} vibe={vibe} /></Box>
                        ))}
                    </Stack>
                ) : (
                    <Typography color="text.secondary">
                        No Vibe Checks
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default UserInformation;
