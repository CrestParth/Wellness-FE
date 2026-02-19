import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText } from "@mui/material";
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import GrayPlus from '../../assets/images/GrayPlus.svg'

const AddStudio = () => {
    const studioForm = useFormik({
        initialValues: {
            name: "",
            location: "",
            description: "",
            email: "",
            categories: [],
        },
        onSubmit: (values) => {
            console.log("Studio Added:", values);
        },
    });
    const categoryOptions = [
        "Gym",
        "Wellness",
        "Meditation",
        "Fitness Center",
    ];



    return (
        <Box sx={{ p: { xs: 0, sm: 1 } }}>
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", p: 3, borderRadius: '10px', boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mb: 3 }}>
                <form onSubmit={studioForm.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid size={12} sx={{
                            borderBottom: "1px solid #E5E7EB",
                            display: "inline-block",
                            paddingBottom: "4px",
                            marginBottom: "10px"
                        }}>
                            <Typography variant="h6" gutterBottom fontWeight={600}>
                                Add Studio
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Studio Name"
                                placeholder="Studio Name"
                                name="name"
                                formik={studioForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Location"
                                placeholder="Location"
                                name="location"
                                formik={studioForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Email"
                                placeholder="Email"
                                name="email"
                                formik={studioForm}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth>
                                <label style={{ marginBottom: 8 }}>Class Style</label>
                                <Select
                                    multiple
                                    fullWidth
                                    name="categories"
                                    value={studioForm.values.categories || []}
                                    onChange={studioForm.handleChange}
                                    displayEmpty
                                    renderValue={(selected) => {
                                        if (!selected || selected.length === 0) {
                                            return <span style={{ color: "#878787" }}>Select Class Style</span>;
                                        }
                                        return selected.join(", ");
                                    }}
                                    sx={{
                                        height: 45,
                                        mt: '3px',
                                        '& .MuiSelect-select': {
                                            height: 50,
                                            display: 'flex',
                                            alignItems: 'center',
                                            color: 'inherit !important',
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#E0E3E7 !important',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#E0E3E7 !important',
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#E0E3E7 !important',
                                            },
                                            boxShadow: 'none',
                                        },
                                    }}
                                >
                                    {categoryOptions.map((cat) => (
                                        <MenuItem key={cat} value={cat}>
                                            <Checkbox checked={studioForm.values.categories.includes(cat)} />
                                            <ListItemText primary={cat} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControl variant="standard" fullWidth>

                                <InputLabel
                                    shrink
                                    htmlFor={'description'}
                                    sx={{
                                        fontSize: "1.3rem",
                                        fontWeight: 450,
                                        color: "rgba(0,0,0,0.8)",
                                        '&.Mui-focused': { color: 'black' }
                                    }}
                                >
                                    Description
                                </InputLabel>


                                <BootstrapInput
                                    id={'description'}
                                    name={'description'}
                                    type={'text'}
                                    placeholder={"Enter descripton"}
                                    multiline
                                    rows={3}
                                    value={studioForm.values.description}
                                    onChange={studioForm.handleChange}
                                    onBlur={studioForm.handleBlur}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <Grid container gap={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                    <label style={{ marginBottom: '10px', display: 'block', fontWeight: 500 }}>Hero Image</label>
                                    <Box
                                        sx={{
                                            border: '2px dashed #E0E3E7',
                                            borderRadius: '12px',
                                            minHeight: 180,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            background: '#fafbfc'
                                        }}
                                        component="label"
                                    >
                                        <input
                                            type="file"
                                            accept="image/*"
                                            hidden
                                            name="hero_img"
                                            onChange={e => studioForm.setFieldValue('hero_img', e.currentTarget.files[0])}
                                        />
                                        {studioForm.values.hero_img instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(studioForm.values.hero_img)}
                                                alt="Selfie Preview"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : studioForm.values.hero_img ? (
                                            <img
                                                src={studioForm.values.hero_img}
                                                alt="Selfie"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : (<><img src={GrayPlus} alt="gray plus" />
                                            <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                        )}
                                    </Box>
                                    {studioForm.touched.hero_img && studioForm.errors.hero_img && (
                                        <FormHelperText error>{studioForm.errors.hero_img}</FormHelperText>
                                    )}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
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
                                            cursor: 'pointer',
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
                                            onChange={e => studioForm.setFieldValue('profile_img', e.currentTarget.files[0])}
                                        />
                                        {studioForm.values.profile_img instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(studioForm.values.profile_img)}
                                                alt="Selfie Preview"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : studioForm.values.profile_img ? (
                                            <img
                                                src={studioForm.values.profile_img}
                                                alt="Selfie"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : (<><img src={GrayPlus} alt="gray plus" />
                                            <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                        )}
                                    </Box>
                                    {studioForm.touched.profile_img && studioForm.errors.profile_img && (
                                        <FormHelperText error>{studioForm.errors.profile_img}</FormHelperText>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width: 180,
                                        height: 48,
                                        borderRadius: '8px',
                                        color: 'white',
                                        backgroundColor: 'var(--Blue)',
                                        fontSize: '16px',
                                    }}
                                >
                                    Add Studio
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default AddStudio;
