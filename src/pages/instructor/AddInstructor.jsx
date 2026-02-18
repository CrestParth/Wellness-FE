import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useCreateInstructor } from "../../Api/Api";
import CustomInput from '../../common/custom/CustomInput'

const AddInstructor = () => {
    const instructorForm = useFormik({
        initialValues: {
            name: "",
            studio: "",
            services: "",
            location: "",
            time: "",
            email: "",
            phone: "",
        },
        onSubmit: (values) => {
            console.log("Instructor Added (Dummy):", values);
            alert("Instructor added (dummy)");
        },
    });

    return (
        <Box sx={{ p: { xs: 0, sm: 1 } }}>
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", p: 3, borderRadius: '10px', boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mb: 3 }}>
                <form>
                    <Grid container spacing={2}>
                        <Grid size={12} sx={{
                            borderBottom: "1px solid #E5E7EB",
                            display: "inline-block",
                            paddingBottom: "4px",
                            marginBottom: "10px"
                        }}>
                            <Typography variant="h6" gutterBottom fontWeight={600}>
                                Add Instructor Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Instructor Name"
                                placeholder="Instructor Name"
                                name="name"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Studio"
                                placeholder="Studio"
                                name="studio"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Services"
                                placeholder="Services"
                                name="services"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Location"
                                placeholder="Location"
                                name="location"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Available Time"
                                placeholder="Available Time"
                                name="time"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Email"
                                placeholder="Email"
                                name="email"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Phone"
                                placeholder="Phone"
                                name="phone"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                <Button variant="contained"
                                    sx={{ width: 180, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                    onClick={() => {
                                        profileForm.handleSubmit()
                                    }}>
                                    Add Instructor
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default AddInstructor;
