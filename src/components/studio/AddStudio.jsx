import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, FormHelperText, CircularProgress } from "@mui/material";
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import GrayPlus from '../../assets/images/GrayPlus.svg'
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { useCreateStudio, useGetCategories } from '../../Api/Api'
import { toast } from "react-toastify";
import Dummy from '../../assets/images/dummy.png'
import { studioValidationSchema } from "../../common/FormValidation";
import { useQueryClient } from "@tanstack/react-query";

const AddStudio = () => {
    const client = useQueryClient();
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
        libraries: ["places"],
    });
    const [autocomplete, setAutocomplete] = useState({});

    const onLoad = (auto) => {
        setAutocomplete(auto);
    };

    const onPlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();

            const latitude = place.geometry?.location?.lat();
            const longitude = place.geometry?.location?.lng();
            const address = place.formatted_address;

            studioForm.setFieldValue("location", address);
            studioForm.setFieldValue("latitude", latitude);
            studioForm.setFieldValue("longitude", longitude);

            console.log("Selected:", address, latitude, longitude);
        }
    };
    const studioForm = useFormik({
        initialValues: {
            name: "",
            location: "",
            about: "",
            contact: "",
            categoryIds: [],
            heroImage: "",
            image1: "",
            image2: "",
            latitude: "",
            longitude: "",
        },
        validationSchema: studioValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("location", values.location);
            formData.append("about", values.about);
            formData.append("contact", values.contact);
            values.categoryIds.forEach((id) => {
                formData.append("categoryIds[]", id);
            });
            formData.append("heroImage", values.heroImage);
            formData.append("images", values.image1);
            formData.append("images", values.image2);
            formData.append("latitude", values.latitude);
            formData.append("longitude", values.longitude);
            formData.append("status", 'active');

            createStudio(formData)
        },
    });

    const fetchDefaultImage = async () => {
        try {
            const response = await fetch(Dummy);
            const blob = await response.blob();
            const file = new File([blob], "dummy.png", { type: "image/png" });
            studioForm.setFieldValue("heroImage", file);
        } catch (error) {
            console.error("Error loading default image:", error);
        }
    };

    useEffect(() => {
        fetchDefaultImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSuccess = () => {
        toast.success("Studio Added Successfully.");
        client.invalidateQueries({ queryKey: ["studios"] });
        studioForm.resetForm();
        fetchDefaultImage();
    };
    const onError = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };

    const { mutate: createStudio, isPending } = useCreateStudio(onSuccess, onError)

    const { data: classStyles } = useGetCategories()

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
                                label="Studio Name *"
                                placeholder="Studio Name"
                                name="name"
                                formik={studioForm}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {isLoaded && (
                                <FormControl fullWidth>
                                    <label style={{ marginBottom: 11 }}>Location *</label>
                                    <Autocomplete
                                        onLoad={onLoad}
                                        onPlaceChanged={onPlaceChanged}
                                    >
                                        <TextField
                                            placeholder="Search Location"
                                            value={studioForm.values.location}
                                            onChange={(e) =>
                                                studioForm.setFieldValue("location", e.target.value)
                                            }
                                            fullWidth
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    height: 45,
                                                    '& fieldset': {
                                                        borderColor: '#E0E3E7',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#E0E3E7',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#E0E3E7',
                                                    },
                                                },
                                            }}
                                        />
                                    </Autocomplete>
                                    {studioForm.touched.location && studioForm.errors.location && (
                                        <FormHelperText error>
                                            {studioForm.errors.location}
                                        </FormHelperText>
                                    )}
                                    {studioForm.touched.location &&
                                        !studioForm.values.latitude &&
                                        !studioForm.errors.location && (
                                            <FormHelperText error>
                                                Please select a location from suggestions
                                            </FormHelperText>
                                        )}
                                </FormControl>
                            )}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <CustomInput
                                label="Email"
                                placeholder="Email"
                                name="contact"
                                formik={studioForm}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <FormControl fullWidth>
                                <label style={{ marginBottom: 8 }}>Class Style *</label>
                                <Select
                                    multiple
                                    fullWidth
                                    name="categoryIds"
                                    value={studioForm.values.categoryIds || []}
                                    onChange={studioForm.handleChange}
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
                                            <Checkbox checked={studioForm.values.categoryIds.includes(cat.id)} />
                                            <ListItemText primary={cat.name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                                {studioForm.touched.categoryIds && studioForm.errors.categoryIds && (
                                    <FormHelperText error>{studioForm.errors.categoryIds}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <FormControl variant="standard" fullWidth>

                                <InputLabel
                                    shrink
                                    htmlFor={'about'}
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
                                    id={'about'}
                                    name={'about'}
                                    type={'text'}
                                    placeholder={"Enter descripton"}
                                    multiline
                                    rows={3}
                                    value={studioForm.values.about}
                                    onChange={studioForm.handleChange}
                                    onBlur={studioForm.handleBlur}
                                />
                                {studioForm.touched.about && studioForm.errors.about && (
                                    <FormHelperText error>{studioForm.errors.about}</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid size={12}>
                            <Grid container gap={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
                                    <label style={{ marginBottom: '10px', display: 'block', fontWeight: 500 }}>Hero Image *</label>
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
                                            name="heroImage"
                                            onChange={e => studioForm.setFieldValue('heroImage', e.currentTarget.files[0])}
                                        />
                                        {studioForm.values.heroImage instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(studioForm.values.heroImage)}
                                                alt="Selfie Preview"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : studioForm.values.heroImage ? (
                                            <img
                                                src={studioForm.values.heroImage}
                                                alt="Selfie"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : (<><img src={GrayPlus} alt="gray plus" />
                                            <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                        )}
                                    </Box>
                                    {studioForm.touched.heroImage && studioForm.errors.heroImage && (
                                        <FormHelperText error>{studioForm.errors.heroImage}</FormHelperText>
                                    )}
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
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

                                                onChange={e => studioForm.setFieldValue('image1', e.currentTarget.files[0])}
                                            />
                                            {studioForm.values.image1 instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(studioForm.values.image1)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : studioForm.values.image1 ? (
                                                <img
                                                    src={studioForm.values.image1}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {studioForm.touched.image1 && studioForm.errors.image1 && (
                                            <FormHelperText error>{studioForm.errors.image1}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 4, md: 3 }}>
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

                                                onChange={e => studioForm.setFieldValue('image2', e.currentTarget.files[0])}
                                            />
                                            {studioForm.values.image2 instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(studioForm.values.image2)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : studioForm.values.image2 ? (
                                                <img
                                                    src={studioForm.values.image2}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {studioForm.touched.image2 && studioForm.errors.image2 && (
                                            <FormHelperText error>{studioForm.errors.image2}</FormHelperText>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isPending}
                                    sx={{
                                        width: 180,
                                        height: 48,
                                        borderRadius: '8px',
                                        color: 'white',
                                        backgroundColor: 'var(--Blue)',
                                        fontSize: '16px',
                                    }}
                                >

                                    {isPending ? (
                                        <CircularProgress size={24} sx={{ color: "white" }} />
                                    ) : (
                                        "Add Studio"
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

export default AddStudio;
