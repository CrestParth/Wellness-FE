import React, { useState } from "react";
import { Box, Typography, Grid, Button, FormControl } from "@mui/material";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useGetInstructorById, useUpdateInstructor } from "../../Api/Api";

const InstructorInfo = () => {
    const [edit, setEdit] = useState(false)
    const instructorForm = useFormik({
        initialValues: {
            name: "Michael Johnson",
            studio: "Iron Core Fitness",
            services: "Strength Training",
            location: "Los Angeles, California, USA",
            time: "5 AM – 9 AM",
            email: "michael.johnson@yopmail.com",
            phone: "+1 310 555 7821",
            countryCode: ""
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
                                Instructor Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Instructor Name"
                                    placeholder="Instructor Name"
                                    name="name"
                                    formik={instructorForm}
                                />) : displayField("Instructor Name", instructorForm.values.name)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Studio"
                                    placeholder="Studio"
                                    name="studio"
                                    formik={instructorForm}
                                />) : displayField("Studio", instructorForm.values.studio)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Services"
                                    placeholder="Services"
                                    name="services"
                                    formik={instructorForm}
                                />) : displayField("Services", instructorForm.values.services)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Location"
                                    placeholder="Location"
                                    name="location"
                                    formik={instructorForm}
                                />) : displayField("Location", instructorForm.values.location)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Available Time"
                                    placeholder="Available Time"
                                    name="time"
                                    formik={instructorForm}
                                />) : displayField("Available Time", instructorForm.values.time)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    formik={instructorForm}
                                />) : displayField("Email", instructorForm.values.email)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <FormControl variant="standard" fullWidth>
                                    <label style={{ marginBottom: 10 }}>Phone Number</label>
                                    <PhoneInput
                                        country={"za"}
                                        value={`${instructorForm.values.countryCode ?? ''}${instructorForm.values.phone ?? ''}`}
                                        onChange={(phone, countryData) => {
                                            const withoutCountryCode = phone.startsWith(countryData.dialCode)
                                                ? phone.slice(countryData.dialCode.length).trim()
                                                : phone;

                                            instructorForm.setFieldValue("phone", withoutCountryCode);
                                            instructorForm.setFieldValue("countryCode", `+${countryData.dialCode}`);
                                        }}
                                        inputStyle={{
                                            width: '100%',
                                            height: '46px',
                                            borderRadius: '6px',
                                            border: '1px solid #E0E3E7',
                                            fontSize: '16px',
                                            paddingLeft: '48px',
                                            background: '#fff',
                                            outline: 'none',
                                            boxShadow: 'none',
                                            borderColor: '#E0E3E7',
                                        }}
                                        buttonStyle={{
                                            borderRadius: '6px 0 0 6px',
                                            border: '1px solid #E0E3E7',
                                            background: '#fff'
                                        }}
                                        containerStyle={{
                                            height: '46px',
                                            width: '100%',
                                            marginBottom: '8px'
                                        }}
                                        specialLabel=""
                                        inputProps={{
                                            name: 'phone',
                                            required: true,
                                            autoFocus: false
                                        }}
                                    />
                                    {instructorForm.touched.phone && instructorForm.errors.phone && (
                                        <FormHelperText error>{instructorForm.errors.phone}</FormHelperText>
                                    )}
                                </FormControl>
                            ) : displayField("Phone Number", `${instructorForm.values.countryCode ?? ''}${instructorForm.values.phone ?? ''}`)}
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
                                                instructorForm.handleSubmit()
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
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default InstructorInfo;
