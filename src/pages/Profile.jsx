import {
    Box, Typography, Button, Grid, FormControl, FormHelperText
} from "@mui/material";
import { useFormik } from "formik";
import { profileValidation_s } from "../common/FormValidation";
import CustomSelect from "../common/custom/CustomSelect";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile, useUpdateProfile, useGetCountryList, useGetProvinceList } from "../Api/Api";
import { toast } from "react-toastify";
import PhoneInput from "react-phone-input-2";
import GrayPlus from '../assets/images/GrayPlus.svg'
import CustomInput from "../common/custom/CustomInput";
const Profile = () => {
    const [edit, setedit] = useState(false);
    const client = useQueryClient();

    const onSuccess = () => {
        toast.success("Profile Updated Successfully.");
        client.invalidateQueries("profile");
    };
    const onError = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };

    const { mutate } = useUpdateProfile(onSuccess, onError);
    const { data: profileData } = useGetProfile();

    const profileForm = useFormik({
        initialValues: super_admin,
        validationSchema: profileValidation_s,
        onSubmit: (values) => {
            setedit(false);
            const formData = new FormData();


            Object.keys(values).forEach((key) => {
                if (key !== "profile_img") {
                    formData.append(key, values[key]);
                }
            });

            if (values.profile_img && values.profile_img instanceof File) {
                formData.append("profile_img", values.profile_img);
            }

            mutate({ profileId: localStorage.getItem("userID"), data: formData });
        },

    });
    const countrylist = useGetCountryList();
    // const cityList = useGetCityList(profileForm.values.province)
    const provincelist = useGetProvinceList(profileForm.values.country);

    // const cityList = ['South Africa']

    useEffect(() => {
        const admin = profileData?.data;
        const profile = admin?.AdminProfiles?.[0] || {};

        profileForm.setValues({
            firstName: admin?.firstName || "",
            lastName: admin?.lastName || "",
            email: admin?.email || "",
            profile_img: admin?.profile_img || "",
            country: profile?.country || "",
            province: profile?.province || "",
            city: profile?.city || "",
            suburb: profile?.suburb || "",
            street: profile?.street_address || "",
            postal_code: profile?.postal_code || "",
            phone: profile?.phone || "",
            country_code: profile?.country_code || "",
        });
    }, [profileData?.data, edit]);


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
                                Profile Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="First Name"
                                    placeholder="First Name"
                                    name="firstName"
                                    formik={profileForm}
                                />
                            ) : displayField("First Name", profileForm.values.firstName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Last Name"
                                    placeholder="Last Name"
                                    name="lastName"
                                    formik={profileForm}
                                />
                            ) : displayField("Last Name", profileForm.values.lastName)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    formik={profileForm}
                                />
                            ) : displayField("Email", profileForm.values.email)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: edit ? 6 : 4 }}>
                            {edit ? (
                                <FormControl variant="standard" fullWidth>
                                    <label style={{ marginBottom: 10 }}>Phone Number</label>
                                    <PhoneInput
                                        country={"za"}
                                        value={`${profileForm.values.country_code ?? ''}${profileForm.values.phone ?? ''}`}
                                        onChange={(phone, countryData) => {
                                            const withoutCountryCode = phone.startsWith(countryData.dialCode)
                                                ? phone.slice(countryData.dialCode.length).trim()
                                                : phone;

                                            profileForm.setFieldValue("phone", withoutCountryCode);
                                            profileForm.setFieldValue("country_code", `+${countryData.dialCode}`);
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
                                    {profileForm.touched.phone && profileForm.errors.phone && (
                                        <FormHelperText error>{profileForm.errors.phone}</FormHelperText>
                                    )}
                                </FormControl>
                            ) : displayField("Phone Number", `${profileForm.values.country_code ?? ''}${profileForm.values.phone ?? ''}`)}
                        </Grid>

                        <Grid size={{ xs: 12, sm: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomSelect
                                    label="Country"
                                    name="country"
                                    value={profileForm.values.country}
                                    onChange={profileForm.handleChange}
                                    options={
                                        countrylist?.data?.data?.data.map((country) => ({
                                            value: country.id,
                                            label: country.name,
                                        })) || []}
                                    error={profileForm.touched.country && Boolean(profileForm.errors.country)}
                                    helperText={profileForm.touched.country && profileForm.errors.country}
                                    disabled={!edit}
                                />
                            ) : displayField("Country", countrylist.data?.data.data?.find(c => c.id === profileForm.values.country)?.name)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomSelect
                                    label="Province"
                                    name="province"
                                    value={profileForm.values.province}
                                    onChange={profileForm.handleChange}
                                    options={provincelist?.data?.data?.data?.map(province => ({
                                        value: province.id,
                                        label: province.name
                                    })) || []}
                                    error={profileForm.touched.province && Boolean(profileForm.errors.province)}
                                    helperText={profileForm.touched.province && profileForm.errors.province}
                                    disabled={!profileForm.values.country || !edit}
                                />
                            ) : displayField("Province", provincelist?.data?.data?.data?.find(p => p.id === profileForm.values.province)?.name)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: edit ? 6 : 4 }}>
                            {edit ? (
                                // <CustomSelect
                                //     label="City"
                                //     name="city"
                                //     value={profileForm.values.city}
                                //     onChange={profileForm.handleChange}
                                //     options={cityList?.data?.data.data?.map(city => ({
                                //         value: city.id,
                                //         label: city.name
                                //     })) || []}
                                //     error={profileForm.errors.city && profileForm.touched.city}
                                //     helperText={profileForm.touched.city ? profileForm.errors.city : ''}
                                // />
                                <CustomInput
                                    label="City"
                                    placeholder="City"
                                    name="city"
                                    formik={profileForm}
                                />
                                // ) : displayField("City", cityList?.data?.data.data?.find(p => p._id === profileForm.values.city)?.city_name)}
                            ) : displayField("City", profileForm.values.city)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Suburb"
                                    placeholder="Suburb"
                                    name="suburb"
                                    formik={profileForm}
                                />
                            ) : displayField("Suburb", profileForm.values.suburb)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Street"
                                    placeholder="Street"
                                    name="street"
                                    formik={profileForm}
                                />
                            ) : displayField("Street", profileForm.values.street)}
                        </Grid>
                        <Grid size={{ xs: 12, sm: edit ? 6 : 4 }}>
                            {edit ? (
                                <CustomInput
                                    label="Postal Code"
                                    placeholder="Postal Code"
                                    name="postal_code"
                                    formik={profileForm}
                                />
                            ) : displayField("Postal Code", profileForm.values.postal_code)}
                        </Grid>
                        {/* images */}
                        <Grid size={12}>
                            <Grid container gap={4} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 4, md: 2.5 }}>
                                    <label style={{ marginBottom: '10px', display: 'block', fontWeight: 500 }}>Selfie Image</label>
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
                                            onChange={e => profileForm.setFieldValue('profile_img', e.currentTarget.files[0])}
                                        />
                                        {profileForm.values.profile_img instanceof File ? (
                                            <img
                                                src={URL.createObjectURL(profileForm.values.profile_img)}
                                                alt="Selfie Preview"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : profileForm.values.profile_img ? (
                                            <img
                                                src={profileForm.values.profile_img}
                                                alt="Selfie"
                                                style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                            />
                                        ) : (<><img src={GrayPlus} alt="gray plus" />
                                            <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                        )}
                                    </Box>
                                    {profileForm.touched.profile_img && profileForm.errors.profile_img && (
                                        <FormHelperText error>{profileForm.errors.profile_img}</FormHelperText>
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
                                            sx={{ width: 130, height: 48, borderRadius: '8px', color: '#878787', fontSize: '16px', fontWeight: 400, border: '1px solid #D1D5DB' }}
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
                                                profileForm.handleSubmit()
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

export default Profile;

const super_admin = {
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    province: "",
    city: "",
    suburb: "",
    postal_code: "",
    country: "",
    phone: "",
    country_code: "",
};
