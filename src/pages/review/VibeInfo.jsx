import React, { useState } from "react";
import { Box, Typography, Grid, Button, Slider, Chip, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import CustomInput from "../../common/custom/CustomInput";

const VibeInfo = () => {
    const [edit, setEdit] = useState(false);

    const vibeForm = useFormik({
        initialValues: {
            classType: "Yoga",
            energy: 4,
            pace: 2,
            cueing: 3,
            focus: 5,
            music: 4,
            tags: ["Calming", "Beginner Friendly", "Good Energy"],
            note: "Loved the slow flow and music selection."
        },
        onSubmit: (values) => {
            console.log("Vibe Check Updated:", values);
            setEdit(false);
        }
    });

    const displayField = (label, value) => (
        <Box mb={2}>
            <Typography sx={{ fontSize: '1.05rem', fontWeight: 500, mb: 0.5 }}>{label}</Typography>
            <Typography color="text.secondary">{value ?? "-"}</Typography>
        </Box>
    );

    const displaySlider = (label, value) => (
        <Box mb={2}>
            <Typography fontWeight={500}>{label}</Typography>
            <Typography color="text.secondary">{value} / 5</Typography>
        </Box>
    );

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
                <form onSubmit={vibeForm.handleSubmit}>
                    <Grid container spacing={3}>

                        <Grid size={12} sx={{ borderBottom: "1px solid #E5E7EB", pb: 1 }}>
                            <Typography variant="h6" fontWeight={600}>
                                Vibe Check Details
                            </Typography>
                        </Grid>

                        {/* Class */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Class Type"
                                    name="classType"
                                    placeholder="Enter Class Type"
                                    formik={vibeForm}
                                />
                            ) : displayField("Class Type", vibeForm.values.classType)}
                        </Grid>

                        {/* Sliders */}
                        {["energy", "pace", "cueing", "focus", "music"].map((field) => (
                            <Grid size={{ xs: 12, md: 4 }} key={field}>
                                {edit ? (
                                    <>
                                        <Typography gutterBottom sx={{ textTransform: "capitalize" }}>
                                            {field}
                                        </Typography>
                                        <Slider
                                            value={vibeForm.values[field]}
                                            min={1}
                                            max={5}
                                            step={1}
                                            sx={{ color: 'var(--Blue)', height: '6px' }}
                                            marks
                                            onChange={(_, val) => vibeForm.setFieldValue(field, val)}
                                        />
                                    </>
                                ) : displaySlider(
                                    field.charAt(0).toUpperCase() + field.slice(1),
                                    vibeForm.values[field]
                                )}
                            </Grid>
                        ))}

                        {/* Tags */}
                        <Grid size={12}>
                            <Typography fontWeight={500} mb={1}>Tags</Typography>
                            <Stack direction="row" gap={1} flexWrap="wrap">
                                {vibeForm.values.tags.map((tag, i) => (
                                    <Chip key={i} label={tag} />
                                ))}
                            </Stack>
                        </Grid>

                        {/* Note */}
                        <Grid size={12}>
                            {edit ? (
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Additional Notes"
                                    name="note"
                                    value={vibeForm.values.note}
                                    onChange={vibeForm.handleChange}
                                />
                            ) : displayField("Note", vibeForm.values.note)}
                        </Grid>

                        {/* Buttons */}
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2}>
                                {edit ? (
                                    <>
                                        <Button
                                            variant="outlined"
                                            onClick={() => setEdit(false)}
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'black', fontSize: '16px', fontWeight: 400, border: '1px solid #D1D5DB' }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                        >
                                            Save
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        onClick={() => setEdit(true)}
                                        sx={{ width: 130, height: 46, backgroundColor: 'var(--Blue)', color: 'white' }}
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

export default VibeInfo;
