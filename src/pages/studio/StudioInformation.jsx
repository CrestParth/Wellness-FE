import {
    Box, Typography, Button, Grid, FormHelperText, Select, FormControl, InputLabel, Checkbox, ListItemText, MenuItem, CircularProgress, TextField
} from "@mui/material";
import { useFormik } from "formik";
import { studioValidationSchema } from "../../common/FormValidation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GrayPlus from '../../assets/images/GrayPlus.svg'
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import CustomSelect from '../../common/custom/CustomSelect'
import CustomInput from "../../common/custom/CustomInput";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { useGetStudioById, useDeleteStudio, useUpdateStudio, useGetCategories } from '../../Api/Api'
import { useJsApiLoader } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { useParams, useNavigate } from "react-router-dom";

const StudioInformation = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [edit, setedit] = useState(false);
    const client = useQueryClient();
    const [openPopup, setOpenPopup] = useState(null);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
        libraries: ["places"],
    });
    const [autocomplete, setAutocomplete] = useState(null);

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



    const onSuccessUpdate = () => {
        toast.success("Studio Updated Successfully.");
        client.invalidateQueries(["studio"], { exact: false });
    };
    const onErrorUpdate = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };

    const onSuccessDelete = () => {
        toast.success("Studio Deleted Successfully.");
        navigate("/home/studio");
        client.invalidateQueries(["studios"], { exact: false });
    };
    const onErrorDelete = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };


    const { data: studioData } = useGetStudioById(params.id)
    const { mutate: updateStudio, isPending } = useUpdateStudio(onSuccessUpdate, onErrorUpdate)
    const { mutate: deleteStudio } = useDeleteStudio(onSuccessDelete, onErrorDelete)



    const studioForm = useFormik({
        initialValues: studioInitialValues,
        validationSchema: studioValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("contact", values.contact);
            formData.append("location", values.location);
            formData.append("status", values.status);
            formData.append("about", values.about);
            formData.append("latitude", values.latitude);
            formData.append("longitude", values.longitude);

            // Categories (array)
            values.categoryIds.forEach((id) => {
                formData.append("categoryIds[]", id);
            });

            // Images (only append if new file selected)
            if (values.heroImage instanceof File) {
                formData.append("heroImage", values.heroImage);
            }

            if (values.image1 instanceof File) {
                formData.append("images", values.image1);
            }
            if (values.image2 instanceof File) {
                formData.append("images", values.image2);
            }

            updateStudio({
                id: params.id,
                data: formData
            });

            setedit(false);
        }
    });

    useEffect(() => {
        if (studioData?.data) {
            setStudioFormValues({
                form: studioForm,
                data: studioData.data
            });
        }
    }, [studioData]);


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
            deleteStudio(params.id);
        }
        handleClose()
    }

    const { data: classStyles } = useGetCategories()
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
                                Studio Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Studio Name"
                                    name="name"
                                    placeholder="Enter studio name"
                                    formik={studioForm}
                                />
                            ) : displayField("Studio Name", studioForm.values.name)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="contact"
                                    formik={studioForm}
                                />
                            ) : displayField("Email", studioForm.values.contact)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                isLoaded && (
                                    <FormControl fullWidth>
                                        <label style={{ marginBottom: 11 }}>Location</label>
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
                                )
                            ) : displayField("Location", studioForm.values.location)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>

                            {edit ? (
                                <CustomSelect
                                    label="Status"
                                    name="status"
                                    value={studioForm.values.status}
                                    onChange={studioForm.handleChange}
                                    options={[{ label: 'active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]}
                                    error={studioForm.touched.status && Boolean(studioForm.errors.status)}
                                    helperText={studioForm.touched.status && studioForm.errors.status}
                                />
                            ) : displayField("Status", studioForm.values.status)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <FormControl fullWidth>
                                    <label style={{ marginBottom: 8 }}>Class Style</label>
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
                                </FormControl>
                            ) : (
                                <Box mb={3}>
                                    <Typography
                                        sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}
                                    >
                                        Class Style
                                    </Typography>

                                    <Box display="flex" gap={1} flexWrap="wrap">
                                        {studioForm.values.categoryIds?.length ? (
                                            studioForm.values.categoryIds.map((catId) => {
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

                        <Grid size={{ xs: edit ? 12 : 6 }}>
                            {edit ? (
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
                                </FormControl>
                            ) : displayField("Description", studioForm.values.about)}
                        </Grid>

                        <Grid size={12}>
                            <Grid container gap={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 4, md: 3.5 }}>
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
                                            name="heroImage"
                                            disabled={!edit}
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
                                <Grid size={{ xs: 12, sm: 4, md: 3.5 }}>
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
                                <Grid size={{ xs: 12, sm: 4, md: 3.5 }}>
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
                        {/* save /edit button */}
                        <Grid size={12}>
                            <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                                {edit ? (
                                    <>
                                        <Button
                                            variant="outlined"
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'black', fontSize: '16px', fontWeight: 400, border: '1px solid #D1D5DB' }}
                                            onClick={() => {
                                                setedit(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            disabled={isPending}
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                            onClick={() => {
                                                studioForm.handleSubmit()
                                            }}
                                        >
                                            {isPending ? (
                                                <CircularProgress size={20} sx={{ color: "white" }} />
                                            ) : (
                                                "Save"
                                            )}
                                        </Button>

                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        sx={{ width: 130, height: 48, color: 'white', borderRadius: '10px', backgroundColor: 'var(--Blue)' }}
                                        onClick={() => setedit(true)}
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
                title="Delete Studio"
                message={`Are you sure you want to permanently delete this studio?`}
                BtnText={'Delete'}
                BtnColor="red"
                icon={DeleteConfirm}
            />
        </Box>
    );
};

export default StudioInformation;

const studioInitialValues = {
    name: "",
    location: "",
    status: "",
    about: "",
    contact: "",
    categoryIds: [],
    heroImage: "",
    image1: "",
    image2: "",
    latitude: "",
    longitude: "",
};
const setStudioFormValues = ({ form, data }) => {
    if (!data) return;

    form.setValues({
        name: data.name || "",
        contact: data.contact || "",
        location: data.location || "",
        latitude: data.latitude || "",
        longitude: data.longitude || "",
        status: data.status || "",
        about: data.about || "",
        categoryIds: data.categories?.map((cat) => cat.id) || [],
        heroImage: data.heroImage || "",
        image1: data.images?.[0] || "",
        image2: data.images?.[1] || ""
    });
};
