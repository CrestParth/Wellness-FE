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
import { useGetInstructorById, useUpdateInstructor, useGetCategories, useDeleteInstructor } from '../../Api/Api'
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { addInstructorValidation } from "../../common/FormValidation";

const InstructorInfo = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
        libraries: ["places"],
    });
    const [autoCompleteRefs, setAutoCompleteRefs] = useState({});
    const handleAutoLoad = (index, auto) => {
        setAutoCompleteRefs(prev => ({
            ...prev,
            [index]: auto
        }));
    };

    const handlePlaceChanged = (index) => {
        const auto = autoCompleteRefs[index];
        if (!auto) return;

        const place = auto.getPlace();

        const lat = place.geometry?.location?.lat();
        const lng = place.geometry?.location?.lng();
        const address = place.formatted_address;

        instructorForm.setFieldValue(`teachesAt[${index}].location`, address);
        instructorForm.setFieldValue(`teachesAt[${index}].lat`, lat);
        instructorForm.setFieldValue(`teachesAt[${index}].long`, lng);
    };
    const { id } = useParams();
    const navigate = useNavigate()
    const client = useQueryClient()
    const [edit, setEdit] = useState(false)
    const [openPopup, setOpenPopup] = useState(null);
    const instructorForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            bio: "",
            playlistUrl: "",
            categories: [],
            vibeChecks: [],
            teachesAt: [{ studioName: "", location: "", lat: "", long: "" }],
            heroPhoto: null,
            image1: null,
            image2: null,
            profileImage: null
        },
        validationSchema: addInstructorValidation,
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("bio", values.bio);
            formData.append("playlistUrl", values.playlistUrl);

            formData.append("teachesAt", JSON.stringify(values.teachesAt));
            formData.append("classStyle", JSON.stringify(values.categories));

            if (values.heroPhoto instanceof File) {
                formData.append("heroPhoto", values.heroPhoto);
            }

            if (values.image1) formData.append("galleryPhotos", values.image1);
            if (values.image2) formData.append("galleryPhotos", values.image2);
            if (values.profileImage) formData.append("instructorProfileImage", values.profileImage);
            // updateInstructor({ id: instructorData?.data?.userId, data: formData })
            updateInstructor({ id, data: formData })

        },
    });

    const { data: instructorData } = useGetInstructorById(id);

    const onSuccess = () => {
        toast.success("Instructor Updated Successfully.");
        client.invalidateQueries(["instructor"], { exact: false });
        setEdit(false)
    };
    const onError = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };
    const { mutate: updateInstructor, isPending } = useUpdateInstructor(onSuccess, onError)

    const displayField = (label, value) => (
        <Box mb={3}>
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}>{label}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ ml: 0.5 }}>
                {value?.toString().trim() ? value : "-"}
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
            firstName: apiData?.user?.firstName || "",
            lastName: apiData?.user?.lastName || "",
            email: apiData.user?.email || "",
            bio: apiData.bio || "",
            playlistUrl: apiData.playlistUrl || "",
            teachesAt: apiData.teachesAt?.map((studio) => ({
                studioName: studio.studioName,
                location: studio.location,
                lat: studio.lat,
                long: studio.long
            })) || [{ studioName: "", location: "", lat: "", long: "" }],

            categories: apiData.classStyle?.map((style) => style.id) || [],

            heroPhoto: apiData.heroPhoto || null,
            image1: apiData.galleryPhotos?.[0] || null,
            image2: apiData.galleryPhotos?.[1] || null,
            profileImage: apiData?.instructorProfileImage || null,
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
                                    placeholder="First Name *"
                                    label="First Name"
                                    name="firstName"
                                    formik={instructorForm}
                                />
                            ) : displayField("First Name", instructorForm.values.firstName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Last Name"
                                    placeholder="Last Name"
                                    name="lastName"
                                    formik={instructorForm}
                                />
                            ) : displayField("Last Name", instructorForm.values.lastName)}
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
                                    {instructorForm.values.teachesAt.map((item, index) => (
                                        <Grid container
                                            key={index}
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                        >
                                            <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 2 }}>

                                                <Typography
                                                    sx={{
                                                        fontSize: "1rem",
                                                        fontWeight: 400,
                                                        mb: 1
                                                    }}
                                                >
                                                    Studio Name
                                                </Typography>
                                                <Box sx={{ flex: 1 }}>
                                                    <BootstrapInput
                                                        name={`teachesAt[${index}].studioName`}
                                                        placeholder="Studio Name"
                                                        value={item.studioName}
                                                        onChange={instructorForm.handleChange}
                                                        fullWidth
                                                    />
                                                    {instructorForm.touched.teachesAt?.[index]?.studioName && instructorForm.errors.teachesAt?.[index]?.studioName && (
                                                        <FormHelperText error>
                                                            {instructorForm.errors.teachesAt?.[index]?.studioName}
                                                        </FormHelperText>
                                                    )}
                                                </Box>
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 2 }}>
                                                <Typography
                                                    sx={{
                                                        fontSize: "1rem",
                                                        fontWeight: 400,
                                                        mb: 1
                                                    }}
                                                >
                                                    Studio Location
                                                </Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    {isLoaded && (
                                                        <FormControl fullWidth>
                                                            <Autocomplete
                                                                onLoad={(auto) => handleAutoLoad(index, auto)}
                                                                onPlaceChanged={() => handlePlaceChanged(index)}
                                                                options={{
                                                                    types: ["geocode"],
                                                                }}
                                                            >
                                                                <BootstrapInput
                                                                    name={`teachesAt[${index}].location`}
                                                                    placeholder="Studio Location"
                                                                    value={item.location}
                                                                    onChange={instructorForm.handleChange}
                                                                    onBlur={instructorForm.handleBlur}
                                                                    fullWidth
                                                                />
                                                            </Autocomplete>
                                                            {instructorForm.touched.teachesAt?.[index]?.location &&
                                                                instructorForm.errors.teachesAt?.[index]?.location ? (
                                                                <FormHelperText error>
                                                                    {instructorForm.errors.teachesAt?.[index]?.location}
                                                                </FormHelperText>
                                                                ) : null}
                                                                {instructorForm.touched.teachesAt?.[index]?.location &&
                                                                    !instructorForm.errors.teachesAt?.[index]?.location
                                                                //      &&
                                                                //     instructorForm.errors.teachesAt?.[index]?.lat ? (
                                                                //     <FormHelperText error>
                                                                //         {instructorForm.errors.teachesAt?.[index]?.lat}
                                                                //     </FormHelperText>
                                                                // ) : null
                                                            }
                                                            </FormControl>
                                                    )}

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
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    ))}

                                </Box>
                            ) : (
                                <Box mb={3}>
                                    <Typography
                                        sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}
                                    >
                                        Teaches At
                                    </Typography>

                                    <Box display="flex" gap={1} flexWrap="wrap">
                                        {instructorForm.values.teachesAt?.length > 0 ? (
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
                                                    }}
                                                >
                                                    {item?.studioName || "-"} — {item?.location || "-"}
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
                                    {instructorForm.touched.categories && instructorForm.errors.categories && (
                                        <FormHelperText error>{instructorForm.errors.categories}</FormHelperText>
                                    )}
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
                                                        {category?.name || "-"}
                                                    </Box>
                                                )
                                            })
                                        ) : (
                                            <Typography color="text.secondary">
                                                No Class Style
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>
                            )}
                        </Grid>
                        <Grid size={12}>
                            {edit ? (
                                <CustomInput
                                    label="Playlist Url"
                                    placeholder="Enter Playlist Url"
                                    name="playlistUrl"
                                    formik={instructorForm}
                                />) : displayField("Playlist Url", instructorForm.values.playlistUrl)}
                        </Grid>
                        <Grid size={12}>
                            <Grid size={{ xs: edit ? 12 : 6 }}>{edit ? (
                                <FormControl variant="standard" fullWidth>

                                    <InputLabel
                                        shrink
                                        htmlFor={'bio'}
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
                                        id={'bio'}
                                        name={'bio'}
                                        type={'text'}
                                        placeholder={"Enter descripton"}
                                        multiline
                                        rows={3}
                                        value={instructorForm.values.bio}
                                        onChange={instructorForm.handleChange}
                                        onBlur={instructorForm.handleBlur}
                                    />
                                </FormControl>
                            ) : displayField("Bio Description", instructorForm.values.bio)}</Grid>
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
                                                name="heroPhoto"
                                                disabled={!edit}
                                                onChange={e => instructorForm.setFieldValue('heroPhoto', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.heroPhoto instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.heroPhoto)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.heroPhoto ? (
                                                <img
                                                    src={instructorForm.values.heroPhoto}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.heroPhoto && instructorForm.errors.heroPhoto && (
                                            <FormHelperText error>{instructorForm.errors.heroPhoto}</FormHelperText>
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
                                                name="profileImage"
                                                disabled={!edit}
                                                onChange={e => instructorForm.setFieldValue('profileImage', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.profileImage instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.profileImage)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.profileImage ? (
                                                <img
                                                    src={instructorForm.values.profileImage}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.profileImage && instructorForm.errors.profileImage && (
                                            <FormHelperText error>{instructorForm.errors.profileImage}</FormHelperText>
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
                                                name="image1"
                                                disabled={!edit}
                                                onChange={e => instructorForm.setFieldValue('image1', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.image1 instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.image1)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.image1 ? (
                                                <img
                                                    src={instructorForm.values.image1}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.image1 && instructorForm.errors.image1 && (
                                            <FormHelperText error>{instructorForm.errors.image1}</FormHelperText>
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
                                                name="image2"
                                                disabled={!edit}
                                                onChange={e => instructorForm.setFieldValue('image2', e.currentTarget.files[0])}
                                            />
                                            {instructorForm.values.image2 instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(instructorForm.values.image2)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : instructorForm.values.image2 ? (
                                                <img
                                                    src={instructorForm.values.image2}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {instructorForm.touched.image2 && instructorForm.errors.image2 && (
                                            <FormHelperText error>{instructorForm.errors.image2}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Grid>
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                {instructorData?.data?.approvalStatus !== 'rejected' &&
                                    <>
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
                                                    disabled={isPending}
                                                    variant="contained"
                                                    sx={{ width: 130, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                                    onClick={() => {
                                                        instructorForm.handleSubmit()
                                                    }}
                                                >
                                                    {isPending ? <CircularProgress size={24} /> : "Save"}
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
                                    </>
                                }

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
