import React from "react";
import { FormControl, InputLabel, FormHelperText } from "@mui/material";
import { BootstrapInput } from "./BootstrapInput";

const CustomInput = ({ label, placeholder, name, formik, readOnly = false, type = "text" }) => {
    return (

        <FormControl variant="standard" fullWidth>
            {label && (
                <InputLabel
                    shrink
                    htmlFor={name}
                    sx={{
                        fontSize: "1.3rem",
                        fontWeight: 450,
                        color: "white",
                        '&.Mui-focused': { color: 'white' }
                    }}
                >
                    {label}
                </InputLabel>
            )}

            <BootstrapInput
                id={name}
                name={name}
                type={type}
                sx={{ color: 'white' }}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                readOnly={readOnly}
            />

            {formik.touched[name] && formik.errors[name] && (
                <FormHelperText error>{formik.errors[name]}</FormHelperText>
            )}
        </FormControl>

    );
};

export default CustomInput;
