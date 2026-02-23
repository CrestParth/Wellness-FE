import {
    Box, Typography, Button, Grid, FormHelperText, InputLabel, FormControl
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
import { useGetStudioById, useDeleteStudio, useUpdateStudio } from '../../Api/Api'
import { useParams, useNavigate } from "react-router-dom";

const StudioInformation = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [edit, setedit] = useState(false);
    const client = useQueryClient();
    const [openPopup, setOpenPopup] = useState(null);

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


    const categoryOptions = [
        { label: "Strength", value: "Strength" },
        { label: "Yoga", value: "Yoga" },
        { label: "Fitness", value: "Fitness" },
    ];

    const { data: studioData } = useGetStudioById(params.id)
    const { mutate: updateStudio } = useUpdateStudio(onSuccessUpdate, onErrorUpdate)
    const { mutate: deleteStudio } = useDeleteStudio(onSuccessDelete, onErrorDelete)



    const studioForm = useFormik({
        initialValues: studioInitialValues,
        validationSchema: studioValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("contact", values.email);
            formData.append("location", values.location);
            formData.append("status", values.status);
            formData.append("about", values.description);

            // Categories (array)
            values.category?.forEach((cat) => {
                formData.append("categories[]", cat);
            });

            // Images (only append if new file selected)
            if (values.hero_img instanceof File) {
                formData.append("hero_img", values.hero_img);
            }

            if (values.profile_img instanceof File) {
                formData.append("profile_img", values.profile_img);
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
            toast.success('Deleted Successfully')
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
                                    name="email"
                                    formik={studioForm}
                                />
                            ) : displayField("Email", studioForm.values.email)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Location"
                                    name="location"
                                    placeholder="City, State"
                                    formik={studioForm}
                                    multiline
                                    rows={3}
                                />
                            ) : displayField("Location", studioForm.values.location)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>

                            {edit ? (
                                <CustomSelect
                                    label="Status"
                                    name="status"
                                    value={studioForm.values.status}
                                    onChange={studioForm.handleChange}
                                    options={[{ label: 'active', value: 'active' }, { label: 'suspended', value: 'suspended' }]}
                                    error={studioForm.touched.status && Boolean(studioForm.errors.status)}
                                    helperText={studioForm.touched.status && studioForm.errors.status}
                                />
                            ) : displayField("Status", studioForm.values.status)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomSelect
                                    label="Class Style"
                                    name="category"
                                    value={studioForm.values.category}
                                    onChange={studioForm.handleChange}
                                    options={categoryOptions}
                                    multiple
                                />
                            ) : (
                                <Box mb={3}>
                                    <Typography
                                        sx={{ fontSize: '1.1rem', fontWeight: 400, mb: 1 }}
                                    >
                                        Class Style
                                    </Typography>

                                    <Box display="flex" gap={1} flexWrap="wrap">
                                        {studioForm.values.category?.length ? (
                                            studioForm.values.category.map((cat) => (
                                                <Box
                                                    key={cat}
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
                                                    {cat}
                                                </Box>
                                            ))
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
                            ) : displayField("Description", studioForm.values.description)}
                        </Grid>

                        <Grid size={12}>
                            <Grid container gap={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 4 }}>
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
                                <Grid size={{ xs: 12, sm: 4 }}>
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
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: 'white', backgroundColor: 'var(--Blue)', fontSize: '16px', fontWeight: 400, }}
                                            onClick={() => {
                                                studioForm.handleSubmit()
                                            }}
                                        >
                                            Save
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
    category: [""],
    email: "",
    location: "",
    status: "",
    description: ''
};
const setStudioFormValues = ({ form, data }) => {
    if (!data) return;

    form.setValues({
        name: data.name || "",
        email: data.contact || "",
        location: data.location || "",
        status: data.status || "",
        description: data.about || "",
        category: data.categories?.map((cat) => cat.name) || [],
        hero_img: data.images?.[0] || "",
        profile_img: data.images?.[1] || ""
    });
};
