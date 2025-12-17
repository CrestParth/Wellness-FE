import {
    Box, Typography, Button, Grid, FormHelperText, FormControl
} from "@mui/material";
import { useFormik } from "formik";
import { vendorValidationSchema } from "../../common/FormValidation";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import GrayPlus from '../../assets/images/GrayPlus.svg'
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import CustomSelect from '../../common/custom/CustomSelect'
import CustomInput from "../../common/custom/CustomInput";

const VendorInformation = () => {
    const [edit, setedit] = useState(false);
    const client = useQueryClient();

    // const onSuccess = () => {
    //     toast.success("Profile Updated Successfully.");
    //     client.invalidateQueries("profile");
    // };
    // const onError = (error) => {
    //     toast.error(error.response.data.message || "Something went Wrong");
    // };


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
                                Vendor Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Vendor / Studio Name"
                                    name="vendorName"
                                    placeholder="Enter vendor name"
                                    formik={vendorForm}
                                />
                            ) : displayField("Vendor Name", vendorForm.values.vendorName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Category"
                                    name="category"
                                    placeholder="Gym / Yoga / Wellness"
                                    formik={vendorForm}
                                />
                            ) : displayField("Category", vendorForm.values.category)}
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
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
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
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Address"
                                    name="address"
                                    placeholder="City, State"
                                    formik={vendorForm}
                                    multiline
                                    rows={3}
                                />
                            ) : displayField("Address", vendorForm.values.address)}
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
                            </Box>
                        </Grid>

                    </Grid>
                </form>
            </Box>
        </Box>
    );
};

export default VendorInformation;

const vendorInitialValues = {
    vendorName: "test",
    category: "GYM",
    email: "test@yopmail.com",
    countryCode: '',
    phone: "123456789",
    address: "test",
    status: "active",
};
