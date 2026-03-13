import React, { useState } from "react";
import { Box, Typography, Grid, Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, ListItemText, Stack, IconButton } from "@mui/material";
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import GrayPlus from '../../assets/images/GrayPlus.svg'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCreateInstructor, useGetCategories } from '../../Api/Api'
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";


const AddInstructor = () => {
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
    const onSuccess = () => {
        toast.success("Instructor Added Successfully.");
    };
    const onError = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };
    const { mutate: createInstructor } = useCreateInstructor(onSuccess, onError)

    const instructorForm = useFormik({
        initialValues: {
            name: "",
            studio: "",
            teachesAt: [
                { studioName: "", location: "", lat: "", long: "" }
            ],
            email: "",
            categories: [],
            description: ""
        },
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append("name", values.name);
            formData.append("studio", values.studio);
            formData.append("teachesAt", JSON.stringify(values.teachesAt));
            formData.append("email", values.email);
            values.categories.forEach((id) => {
                formData.append("categories[]", id);
            });
            formData.append("description", values.description);
            formData.append("hero_img", values.hero_img);
            formData.append("profile_img", values.profile_img);
            createInstructor(formData)
        },
    });

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
                                label="Instructor Name"
                                placeholder="Instructor Name"
                                name="name"
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

                                        const selectedLabels = classStyles?.data?.categories?.filter(option => selected.includes(option.id)).map(option => option.name);

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
                        </Grid>
                        <Grid size={12}>
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
                                            <Box sx={{ flex: 1 }}>
                                                <BootstrapInput
                                                    name={`teachesAt[${index}].studioName`}
                                                    placeholder="Studio Name"
                                                    value={item.studioName}
                                                    onChange={instructorForm.handleChange}
                                                    fullWidth
                                                />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                {isLoaded && (
                                                    <Autocomplete
                                                        onLoad={(auto) => handleAutoLoad(index, auto)}
                                                        onPlaceChanged={() => handlePlaceChanged(index)}
                                                        options={{
                                                            types: ["geocode"],
                                                        }}
                                                    >
                                                        <BootstrapInput
                                                            name={`teachesAt[${index}].location`}
                                                            placeholder="Location"
                                                            value={item.location}
                                                            onChange={instructorForm.handleChange}
                                                            fullWidth
                                                        />
                                                    </Autocomplete>
                                                )}
                                            </Box>
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
                                    Bio Description
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
                                                name="hero_img"

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
                                <Button variant="contained"
                                    sx={{ width: 180, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                    onClick={() => {
                                        instructorForm.handleSubmit()
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
