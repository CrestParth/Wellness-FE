import * as yup from "yup"

const Username = yup.string().required("This is a required field")

const String = yup.string().required("This Field is Required")

const Number = yup.number().required("This Field is Required")

const Email = yup.string().required("Email is Required").email("Please Enter a valid Email ID")

const ID = yup.string().required("Plase enter a valid ID").typeError("Plase enter a valid ID")

const Password = yup.string()
    .required("Password is Required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')

const MobileNumber = yup.string()
    .required("Mobile Number is Required");

export const loginValidation = yup.object({
    email: Email,
    password: Password,
})
export const userValidation = yup.object({
    firstName: String,
    lastName: String,
    userType: yup.string()
        .required("User Type type is required"),
    status: yup.string()
        .required("Status is required"),
    notification: yup.boolean().required("Please select notifications Settings"),
});

export const profileValidation_s = yup.object({
    firstName: Username,
    lastName: Username,
    email: Email,
    phone: MobileNumber,
    street: String,
    province: String,
    city: String,
    suburb: String,
    postal_code: Number,
    country: String
});

export const vendorValidationSchema = yup.object({
    vendorName: yup.string()
        .required("Vendor Name is required"),
    Category: yup.string()
        .required("Vendor Name is required"),
    email: Email,
    phone: MobileNumber,
    address: String,
    status: String
})
