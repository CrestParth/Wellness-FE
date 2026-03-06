import React, { useState,useEffect } from "react";
import {
    Box, Typography, Button, Grid, FormHelperText, Stack
} from "@mui/material";
import { useFormik } from "formik";
import CustomInput from '../../common/custom/CustomInput'
import GrayPlus from '../../assets/images/GrayPlus.svg'
import VibeCard from "../../components/VibeCard";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { toast } from "react-toastify";
import { useGetUserById,useUpdateUser,useDeleteUser } from "../../Api/Api";
import { useParams,useNavigate } from "react-router-dom";


const UserInformation = () => {
    const {id}=useParams()
    const [edit, setEdit] = useState(false)
    const [openPopup, setOpenPopup] = useState(null);
    const navigate = useNavigate();
    const {data:userData}=useGetUserById(id)

    const userForm = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            profileImage: "",
            vibeChecks: []
        },
        onSubmit: (values) => {
    
            const formData = new FormData();
    
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
    
            if (values.profileImage instanceof File) {
                formData.append("profileImage", values.profileImage);
            }
    
            UpdateUser({
                id: id,
                body: formData
            });
    
            setEdit(false);
        }
    });
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
            DeleteUser(id);
        }
        handleClose();
    };
    useEffect(() => {
        if (userData?.data) {
            const user = userData.data;
    
            userForm.setValues({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                profileImage: user.profileImage || "",
                vibeChecks: user.vibes || []
            });
        }
    }, [userData]);

    const { mutate: DeleteUser } = useDeleteUser(
        () => {
            toast.success("User deleted successfully");
            navigate("/home/users");
        },
        (error) => toast.error(error?.response?.data?.message || "Something went wrong")
    );
    const onSuccess = () => {
        toast.success("User edited Successfully.");
    };
    const onError = (error) => {
        toast.error(error.response.data.message || "Something went Wrong");
    };
    const {mutate:UpdateUser}=useUpdateUser(onSuccess,onError)
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
                                User Information
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
    {edit ? (
        <CustomInput
            label="First Name"
            placeholder="Enter First Name"
            name="firstName"
            formik={userForm}
        />
    ) : displayField("First Name", userForm.values.firstName)}
</Grid>

<Grid size={{ xs: 12, sm: 6 }}>
    {edit ? (
        <CustomInput
            label="Last Name"
            placeholder="Enter Last Name"
            name="lastName"
            formik={userForm}
        />
    ) : displayField("Last Name", userForm.values.lastName)}
</Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            {edit ? (
                                <CustomInput
                                    label="Email"
                                    placeholder="Email"
                                    name="email"
                                    formik={userForm}
                                />) : displayField("Email", userForm.values.email)}
                        </Grid>

                        <Grid size={12}>
                            <Grid container gap={3} sx={{ mt: 1 }}>
                                <Grid size={{ xs: 12, sm: 3.7 }}>
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
                                                onChange={e => userForm.setFieldValue('profileImage', e.currentTarget.files[0])}
                                            />
                                            {userForm.values.profileImage instanceof File ? (
                                                <img
                                                    src={URL.createObjectURL(userForm.values.profileImage)}
                                                    alt="Selfie Preview"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : userForm.values.profileImage ? (
                                                <img
                                                    src={userForm.values.profileImage}
                                                    alt="Selfie"
                                                    style={{ height: 200, width: '100%', objectFit: 'contain', marginBottom: 8 }}
                                                />
                                            ) : (<><img src={GrayPlus} alt="gray plus" />
                                                <Typography sx={{ color: '#B0B0B0', fontWeight: 550, mt: 1 }}>Upload</Typography></>
                                            )}
                                        </Box>
                                        {userForm.touched.profileImage && userForm.errors.profileImage && (
                                            <FormHelperText error>{userForm.errors.profileImage}</FormHelperText>
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
                                                userForm.handleSubmit()
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
            <ConfirmationPopUp
                open={openPopup === "delete"}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title="Delete User"
                message={`Are you sure you want to permanently delete this user?`}
                BtnText={'Delete'}
                BtnColor="red"
                icon={DeleteConfirm}
            />
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", p: 4, borderRadius: '10px', boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mb: 3 }}>
                <Typography variant="h6" fontWeight={600} mb={3}>
                    Vibes given by User
                </Typography>

                {userForm.values?.vibeChecks?.length > 0 ? (
                    <Stack spacing={3} >
                        {userForm.values.vibeChecks.map((vibe, i) => (
                            <Box  key={vibe.id || i} sx={{
                                borderRadius: 4,
                                p: 3,
                                border: '1px solid black'
                            }}> <VibeCard vibe={vibe} /></Box>
                        ))}
                    </Stack>
                ) : (
                    <Typography color="text.secondary">
                        No Vibe Checks
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default UserInformation;
