import React, { useState, useEffect } from "react";
import {
    Box, Typography, Button, Grid, FormHelperText, InputLabel, FormControl, IconButton, Stack, Select, MenuItem, Checkbox, ListItemText
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import GrayPlus from '../../assets/images/GrayPlus.svg'
import InstructorVibeCard from "../../components/instructor/InstructorVibeCard";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { toast } from "react-toastify";
import { useGetInstructorById, useGetCategories, useDeleteInstructor } from '../../Api/Api'
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";


const InstructorInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const client = useQueryClient()
    const [edit, setEdit] = useState(false)
    const [openPopup, setOpenPopup] = useState(null);
    const instructorForm = useFormik({
        initialValues: {
            name: "",
            teachesAt: [{ studioName: "", location: "" }],
            email: "",
            categories: [],
            description: "",
            hero_img: "",
            profile_img: "",
            vibeChecks: []
        },
        onSubmit: (values) => {
            console.log("Instructor Added (Dummy):", values);
            alert("Instructor added (dummy)");
        },
    });

    const { data: instructorData } = useGetInstructorById(id);

    const displayField = (label, value) => (
        <Box mb={3}>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}>{label}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
                {value || "-"}
            </Typography>
        </Box>
    );
    const addTeachesAt = () => {
        instructorForm.setFieldValue("teachesAt", [
            ...instructorForm.values.teachesAt,
            { studioName: "", location: "" }
        ]);
    };

    const removeTeachesAt = (index) => {
        const updated = instructorForm.values.teachesAt.filter(
            (_, i) => i !== index
        );
        instructorForm.setFieldValue("teachesAt", updated);
    };

    const { data: classStyles } = useGetCategories()

    useEffect(() => {
        if (!instructorData?.data) return;

        const apiData = instructorData.data;

        instructorForm.setValues({
            name: apiData.displayName || "",
            email: apiData.user?.email || "",
            description: apiData.bio || "",

            teachesAt:
                apiData.teachesAt?.map((studio) => ({
                    studioName: studio.studioName,
                    location: studio.location
                })) || [{ studioName: "", location: "" }],

            categories:
                apiData.classStyle?.map((style) => style.id) || [],

            hero_img: apiData.heroPhoto || "",
            profile_img: apiData.galleryPhotos?.[0] || "",

            vibeChecks: apiData.vibes || []
        });
    }, [instructorData]);

    const onSuccessDelete = () => {
        toast.success("Instructor Deleted Successfully.");
        navigate("/home/instructors");
        client.invalidateQueries(["instructors"], { exact: false });
    };
    const onErrorDelete = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };
    const { mutate: deleteInstructor } = useDeleteInstructor(onSuccessDelete, onErrorDelete)

    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);

    const handleConfirm = () => {
        if (openPopup === "delete") {
            deleteInstructor(instructorData?.data?.userId);
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
                                Instructor Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Instructor Name"
                                    placeholder="Instructor Name"
                                    name="name"
                                    formik={instructorForm}
                                />) : displayField("Instructor Name", instructorForm.values.name)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    formik={instructorForm}
                                />) : displayField("Email", instructorForm.values.email)}
                        </Grid>
                        {/* <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Location"
                                    placeholder="Location"
                                    name="location"
                                    formik={instructorForm}
                                />) : displayField("Location", instructorForm.values.location)}
                        </Grid> */}
                        <Grid size={12}>
                            {edit ? (
                                <Box>
                                    <Typography
                                        sx={{
                                            fontSize: "1rem",
                                            fontWeight: 400,
                                            mb: 2
                                        }}
                                    >
                                        Teaches At
                                    </Typography>

                                    <Stack spacing={2}>
                                        {instructorForm.values.teachesAt.map((item, index) => (
                                            <Stack
                                                key={index}
                                                direction="row"
                                                spacing={2}
                                                alignItems="center"
                                            >
                                                <BootstrapInput
                                                    name={`teachesAt[${index}].studioName`}
                                                    placeholder="Studio Name"
                                                    value={item.studioName}
                                                    onChange={instructorForm.handleChange}
                                                    sx={{ flex: 1 }}
                                                />

                                                <BootstrapInput
                                                    name={`teachesAt[${index}].location`}
                                                    placeholder="Location"
                                                    value={item.location}
                                                    onChange={instructorForm.handleChange}
                                                    sx={{ flex: 1 }}
                                                />
                                                {index !== instructorForm.values.teachesAt.length - 1 && (
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => removeTeachesAt(index)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}

                                                {index === instructorForm.values.teachesAt.length - 1 && (
                                                    <IconButton
                                                        sx={{ color: "var(--Blue)" }}
                                                        onClick={addTeachesAt}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                )}
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Box>
                            ) : (
                                <Box mb={3}>
                                    <Typography
                                        sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}
                                    >
                                        Teaches At
                                    </Typography>

                                    <Box display="flex" gap={1} flexWrap="wrap">
                                        {instructorForm.values.teachesAt?.length ? (
                                            instructorForm.values.teachesAt.map((item, i) => (
                                                <Box
                                                    key={i}
                                                    sx={{
                                                        px: 2.5,
                                                        py: 0.8,
                                                        borderRadius: "999px",
                                                        border: "1px solid #A855F7",
                                                        color: "#A855F7",
                                                        fontWeight: 600,
                                                        fontSize: "14px",
                                                        backgroundColor: "transparent",
                                                    }}
                                                >
                                                    {item.studioName} — {item.location}
                                                </Box>
                                            ))
                                        ) : (
                                            <Typography color="text.secondary">-</Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Grid>



                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <FormControl fullWidth>
                                    <label style={{ marginBottom: 8 }}>Class Style</label>
                                    <Select
                                        multiple
                                        fullWidth
                                        name="categories"
                                        value={instructorForm.values.categories || []}
                                        onChange={instructorForm.handleChange}
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (!selected || selected.length === 0) {
                                                return <span style={{ color: "#878787" }}>Select Class Style</span>;
                                            }

                                            const selectedLabels = classStyles?.data?.categories?.filter(option => selected.includes(option.id))?.map(option => option.name);

                                            return selectedLabels.join(", ");
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
                                        {classStyles?.data?.categories?.map((cat) => (
                                            <MenuItem key={cat.id} value={cat.id}>
                                                <Checkbox checked={instructorForm.values.categories.includes(cat.id)} />
                                                <ListItemText primary={cat.name} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ) : (
                                <Box mb={3}>
                                    <Typography
                                        sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}
                                    >
                                        Class Style
                                    </Typography>

                                    <Box display="flex" gap={1} flexWrap="wrap">
                                        {instructorForm.values.categories?.length ? (
                                            instructorForm.values.categories.map((catId) => {
                                                const category = classStyles?.data?.categories?.find(c => c.id === catId);
                                                return (
                                                    <Box
                                                        key={catId}
                                                        sx={{
                                                            px: 2.5,
                                                            py: 0.8,
                                                            borderRadius: "999px",
                                                            border: "1px solid #A855F7",
                                                            color: "#A855F7",
                                                            fontWeight: 600,
                                                            fontSize: "14px",
                                                            backgroundColor: "transparent",
                                                        }}
                                                    >
                                                        {category?.name}
                                                    </Box>
                                                )
                                            })
                                        ) : (
                                            <Typography color="text.secondary">-</Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                        <Grid size={12}>
                            <Grid size={{ xs: edit ? 12 : 6 }}>{edit ? (
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
                                        value={instructorForm.values.description}
                                        onChange={instructorForm.handleChange}
                                        onBlur={instructorForm.handleBlur}
                                    />
                                </FormControl>
                            ) : displayField("Bio Description", instructorForm.values.description)}</Grid>
                        </Grid>
                        <Grid size={12}>
                            <Grid container gap={3} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 2.7 }}>
                                    <Grid size={{ xs: 12 }}>
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
                                                name="hero_img"
                                                disabled={!edit}
                                                onChange={e => instructorForm.setFieldValue('hero_img', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.hero_img instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.hero_img)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.hero_img ? (
                                                <img
                                                    src={instructorForm.values.hero_img}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.hero_img && instructorForm.errors.hero_img && (
                                            <FormHelperText error>{instructorForm.errors.hero_img}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 2.7 }}>
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
                                                onChange={e => instructorForm.setFieldValue('profile_img', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.profile_img instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.profile_img)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.profile_img ? (
                                                <img
                                                    src={instructorForm.values.profile_img}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.profile_img && instructorForm.errors.profile_img && (
                                            <FormHelperText error>{instructorForm.errors.profile_img}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 2.7 }}>
                                    <Grid size={{ xs: 12 }}>
                                        <label style={{ marginBottom: '10px', display: 'block', fontWeight: 500 }}>Additional Image 1</label>
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
                                                name="hero_img"
                                                disabled={!edit}
                                                onChange={e => instructorForm.setFieldValue('hero_img', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.hero_img instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.hero_img)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.hero_img ? (
                                                <img
                                                    src={instructorForm.values.hero_img}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.hero_img && instructorForm.errors.hero_img && (
                                            <FormHelperText error>{instructorForm.errors.hero_img}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 2.7 }}>
                                    <Grid size={{ xs: 12 }}>
                                        <label style={{ marginBottom: '10px', display: 'block', fontWeight: 500 }}>Additional Image 2</label>
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
                                                onChange={e => instructorForm.setFieldValue('profile_img', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.profile_img instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.profile_img)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.profile_img ? (
                                                <img
                                                    src={instructorForm.values.profile_img}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.profile_img && instructorForm.errors.profile_img && (
                                            <FormHelperText error>{instructorForm.errors.profile_img}</FormHelperText>
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
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", p: 4, borderRadius: '10px', boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mb: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                    Vibe Checks by Users
                </Typography>

                {instructorForm.values?.vibeChecks?.length > 0 ? (
                    <Stack spacing={3} >
                        {instructorForm.values.vibeChecks.map((vibe, i) => (
                            <Box sx={{
                                borderRadius: 4,
                                p: 3,
                                border: '1px solid black'
                            }}> <InstructorVibeCard key={vibe.id || i} vibe={vibe} /></Box>
                        ))}
                    </Stack>
                ) : (
                    <Typography color="text.secondary">
                        No Vibe Checks
                    </Typography>
                )}
            </Box>
            <ConfirmationPopUp
                open={openPopup === "delete"}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title="Delete Instructor"
                message={`Are you sure you want to permanently delete this instructor?`}
                BtnText={'Delete'}
                BtnColor="red"
                icon={DeleteConfirm}
            />
        </Box>
    );
};

export default InstructorInfo;
