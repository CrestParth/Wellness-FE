import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, Stack, IconButton, FormHelperText } from "@mui/material";
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import GrayPlus from '../../assets/images/GrayPlus.svg'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateInstructor, useGetCategories } from '../../Api/Api'
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { addInstructorValidation } from "../../common/FormValidation";
import CircularProgress from "@mui/material/CircularProgress";
import instcterdummy from '../../assets/images/instcterdummy.png'

const AddInstructor = () => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
        libraries: ["places"],
    });
    const [autoCompleteRefs, setAutoCompleteRefs] = useState({});
    const client = useQueryClient()
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
    const onSuccess = () => {
        toast.success("Instructor Added Successfully.");
        client.invalidateQueries(['instructors'], { exact: false })
        instructorForm.resetForm();
        fetchDefaultImage();
    };
    const onError = (error) => {
        toast.error(error?.response?.data?.message || "Something went Wrong");
    };
    const { mutate: createInstructor, isPending } = useCreateInstructor(onSuccess, onError)

    const instructorForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            playlistUrl: "",
            bio: "",
            categories: [],
            teachesAt: [
                { studioName: "", location: "", lat: "", long: "" }
            ],
            heroPhoto: null,
            profileImage: null,
            image1: null,
            image2: null,
        },
        validationSchema: addInstructorValidation,
        onSubmit: (values) => {
            const formData = new FormData();

            // Basic fields
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            const displayName = `${values.firstName} ${values.lastName}`;
            formData.append("displayName", displayName);

            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("bio", values.bio);
            formData.append("playlistUrl", values.playlistUrl);
            formData.append("status", true);

            // JSON fields
            formData.append("teachesAt", JSON.stringify(values.teachesAt));
            formData.append("classStyle", JSON.stringify(values.categories));

            // Files
            if (values.heroPhoto) {
                formData.append("heroPhoto", values.heroPhoto);
            }
            formData.append("instructorProfileImage", values.profileImage);
            formData.append("galleryPhotos", values.image1);
            formData.append("galleryPhotos", values.image2);


            createInstructor(formData);
        }
    });
    const fetchDefaultImage = async () => {
        try {
            const response = await fetch(instcterdummy);
            const blob = await response.blob();
            const file = new File([blob], "instcterdummy.png", { type: "image/png" });
            instructorForm.setFieldValue("profileImage", file);
        } catch (error) {
            console.error("Error loading default image:", error);
        }
    };

    useEffect(() => {
        fetchDefaultImage();
    }, []);

    const addTeachesAt = () => {
        instructorForm.setFieldValue("teachesAt", [
            ...instructorForm.values.teachesAt,
            { studioName: "", location: "" }
        ]);
    };

    const removeTeachesAt = (index) => {
        const updated = instructorForm.values.teachesAt.filter((_, i) => i !== index);
        instructorForm.setFieldValue("teachesAt", updated);
    };

    const { data: classStyles } = useGetCategories()

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
                                label="First Name *"
                                placeholder="Enter First Name"
                                name="firstName"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Last Name *"
                                placeholder="Enter Last Name"
                                name="lastName"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Email "
                                placeholder="Email"
                                name="email"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Password "
                                placeholder="Enter Password"
                                name="password"
                                // type="password"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth>
                                <label style={{ marginBottom: 8 }}>Class Style *</label>
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
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Playlist Url"
                                placeholder="Enter Playlist Url"
                                name="playlistUrl"
                                // type="password"
                                formik={instructorForm}
                            />
                        </Grid>
                        <Grid size={12}>
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
                                                Studio Name *
                                            </Typography>
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
                                        </Grid>
                                        <Grid size={{ xs: 12, sm: 6 }} sx={{ mb: 2 }}>
                                            <Typography
                                                sx={{
                                                    fontSize: "1rem",
                                                    fontWeight: 400,
                                                    mb: 1
                                                }}
                                            >
                                                Studio Location *
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
                                                            !instructorForm.errors.teachesAt?.[index]?.location &&
                                                            instructorForm.errors.teachesAt?.[index]?.lat ? (
                                                            <FormHelperText error>
                                                                {instructorForm.errors.teachesAt?.[index]?.lat}
                                                            </FormHelperText>
                                                        ) : null}
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
                        </Grid>


                        <Grid size={{ xs: 12 }}>
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
                                    Bio Description
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
                                {instructorForm.touched.bio && instructorForm.errors.bio && (
                                    <FormHelperText error>{instructorForm.errors.bio}</FormHelperText>
                                )}
                            </FormControl>
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
                                                name="heroPhoto"

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
                                                name="profileImage"

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
                                                name="image1"

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
                                                name="image2"

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
                                <Button variant="contained"
                                    disabled={isPending}
                                    sx={{ width: 180, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                    onClick={() => {
                                        instructorForm.handleSubmit()
                                    }}>
                                    {isPending ? (
                                        <CircularProgress size={24} sx={{ color: "white" }} />
                                    ) : (
                                        "Add Instructor"
                                    )}
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
