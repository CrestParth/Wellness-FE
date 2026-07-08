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
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
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
});

export const studioValidationSchema = yup.object({
    name: yup.string()
        .required("Studio Name is required"),

    location: yup.string()
        .required("Location is required"),

    // contact: yup.string()
    //     .email("Invalid email")
    //     .required("Email is required"),

    // about: yup.string()
    //     .required("Description is required"),

    categoryIds: yup.array()
        .min(1, "Select at least one category"),

    heroImage: yup.mixed()
        .required("Hero image is required"),
    // image1: yup.mixed()
    //     .required("Image is required"),
    // image2: yup.mixed()
    //     .required("Image is required"),

    latitude: yup.string()
        .required("Location must be selected from dropdown"),

    longitude: yup.string()
        .required("Location must be selected from dropdown"),
});

export const addInstructorValidation = yup.object({

    firstName: yup.string()
        .required("First name is required"),

    lastName: yup.string()
        .required("Last name is required"),

    // email: yup.string()
    //     .email("Invalid email")
    //     .required("Email is required"),

    // password: yup.string()
    //     .required("Password is required")
    //     .min(6, "Password must be at least 6 characters"),

    // displayName: yup.string()
    //     .required("Display name is required"),

    // playlistUrl: yup.string()
    //     .url("Enter a valid URL")
    //     .required("Playlist URL is required"),

    // bio: yup.string()
    //     .required("Bio is required"),

    categories: yup.array()
        .min(1, "Select at least one class style"),

    teachesAt: yup.array()
        .of(
            yup.object().shape({
                studioName: yup.string()
                    .required("Studio name is required"),

                location: yup.string()
                    .required("Location is required"),

                lat: yup.number()
                    .typeError("Select location from dropdown")
                    .required("Latitude is required"),

                long: yup.number()
                    .typeError("Select location from dropdown")
                    .required("Longitude is required"),
            })
        )
        .min(1, "At least one studio is required"),

    // Images
    // heroPhoto: yup.mixed()
    //     .required("Hero image is required"),

    // image1: yup.mixed()
    //     .required("Image is required"),

    // image2: yup.mixed()
    //     .required("Image is required"),
});



export const editUserValidation = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup.string()
        .email("Invalid email")
        .required("Email is required"),
});