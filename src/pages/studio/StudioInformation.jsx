import {
    Box, Typography, Button, Grid, FormHelperText, InputLabel, FormControl
} from "@mui/material";
import { useFormik } from "formik";
import { vendorValidationSchema } from "../../common/FormValidation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GrayPlus from '../../assets/images/GrayPlus.svg'
import { BootstrapInput } from "../../common/custom/BootstrapInput";
import CustomSelect from '../../common/custom/CustomSelect'
import CustomInput from "../../common/custom/CustomInput";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'

const StudioInformation = () => {
    const [edit, setedit] = useState(false);
    const client = useQueryClient();
    const [openPopup, setOpenPopup] = useState(null);

    // const onSuccess = () => {
    //     toast.success("Profile Updated Successfully.");
    //     client.invalidateQueries("profile");
    // };
    // const onError = (error) => {
    //     toast.error(error.response.data.message || "Something went Wrong");
    // };

    const categoryOptions = [
        { label: "Strength", value: "Strength" },
        { label: "Yoga", value: "Yoga" },
        { label: "Fitness", value: "Fitness" },
    ];



    const vendorForm = useFormik({
        initialValues: vendorInitialValues,
        validationSchema: vendorValidationSchema,
        onSubmit: (values) => {
            setedit(false);
            console.log("Vendor Data (Dummy):", values);
            toast.success("Vendor updated successfully");
            // const formData = new FormData();
            // Object.keys(values).forEach((key) => {
            //         formData.append(key, values[key]);
            // });
            // mutate({ profileId: localStorage.getItem("userID"), data: formData });
        },

    });


    // useEffect(() => {
    //     const admin = profileData?.data;
    //     const profile = admin?.AdminProfiles?.[0] || {};

    //     vendorForm.setValues({
    //         firstName: admin?.firstName || "admin",
    //         lastName: admin?.lastName || "user",
    //         email: admin?.email || "adminUser@yopmail.com",
    //         profile_img: admin?.profile_img || "",
    //     });
    // }, [profileData?.data, edit]);


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
                                    name="vendorName"
                                    placeholder="Enter studio name"
                                    formik={vendorForm}
                                />
                            ) : displayField("Studio Name", vendorForm.values.vendorName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    formik={vendorForm}
                                />
                            ) : displayField("Email", vendorForm.values.email)}
                        </Grid>
                        {/* <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <FormControl variant="standard" fullWidth>
                                    <label style={{ marginBottom: 10 }}>Phone Number</label>
                                    <PhoneInput
                                        country={"za"}
                                        value={`${vendorForm.values.countryCode ?? ''}${vendorForm.values.phone ?? ''}`}
                                        onChange={(phone, countryData) => {
                                            const withoutCountryCode = phone.startsWith(countryData.dialCode)
                                                ? phone.slice(countryData.dialCode.length).trim()
                                                : phone;

                                            vendorForm.setFieldValue("phone", withoutCountryCode);
                                            vendorForm.setFieldValue("countryCode", `+${countryData.dialCode}`);
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
                                    {vendorForm.touched.phone && vendorForm.errors.phone && (
                                        <FormHelperText error>{vendorForm.errors.phone}</FormHelperText>
                                    )}
                                </FormControl>
                            ) : displayField("Phone Number", `${vendorForm.values.countryCode ?? ''}${vendorForm.values.phone ?? ''}`)}
                        </Grid> */}
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Location"
                                    name="location"
                                    placeholder="City, State"
                                    formik={vendorForm}
                                    multiline
                                    rows={3}
                                />
                            ) : displayField("Location", vendorForm.values.location)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>

                            {edit ? (
                                <CustomSelect
                                    label="Status"
                                    name="status"
                                    value={vendorForm.values.status}
                                    onChange={vendorForm.handleChange}
                                    options={[{ label: 'active', value: 'active' }, { label: 'suspended', value: 'suspended' }]}
                                    error={vendorForm.touched.status && Boolean(vendorForm.errors.status)}
                                    helperText={vendorForm.touched.status && vendorForm.errors.status}
                                />
                            ) : displayField("Status", vendorForm.values.status)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomSelect
                                    label="Class Style"
                                    name="category"
                                    value={vendorForm.values.category}
                                    onChange={vendorForm.handleChange}
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
                                        {vendorForm.values.category?.length ? (
                                            vendorForm.values.category.map((cat) => (
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
                                        value={vendorForm.values.description}
                                        onChange={vendorForm.handleChange}
                                        onBlur={vendorForm.handleBlur}
                                    />
                                </FormControl>
                            ) : displayField("Description", vendorForm.values.description)}
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
                                            onChange={e => vendorForm.setFieldValue('hero_img', e.currentTarget.files[0])}
                                        />
                                        {vendorForm.values.hero_img instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(vendorForm.values.hero_img)}
                                                alt="Selfie Preview"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : vendorForm.values.hero_img ? (
                                            <img
                                                src={vendorForm.values.hero_img}
                                                alt="Selfie"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : (<><img src={GrayPlus} alt="gray plus" />
                                            <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                        )}
                                    </Box>
                                    {vendorForm.touched.hero_img && vendorForm.errors.hero_img && (
                                        <FormHelperText error>{vendorForm.errors.hero_img}</FormHelperText>
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
                                            onChange={e => vendorForm.setFieldValue('profile_img', e.currentTarget.files[0])}
                                        />
                                        {vendorForm.values.profile_img instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(vendorForm.values.profile_img)}
                                                alt="Selfie Preview"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : vendorForm.values.profile_img ? (
                                            <img
                                                src={vendorForm.values.profile_img}
                                                alt="Selfie"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : (<><img src={GrayPlus} alt="gray plus" />
                                            <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                        )}
                                    </Box>
                                    {vendorForm.touched.profile_img && vendorForm.errors.profile_img && (
                                        <FormHelperText error>{vendorForm.errors.profile_img}</FormHelperText>
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
                                                vendorForm.handleSubmit()
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

const vendorInitialValues = {
    vendorName: "test",
    category: ["Strength", "Yoga", "Fitness"],
    email: "test@yopmail.com",
    location: "test",
    status: "active",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'
};

