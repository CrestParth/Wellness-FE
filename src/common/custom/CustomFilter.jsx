import React, { useState } from "react";
import {
    Button,
    Menu,
    MenuItem,
    Typography,
    Box
} from "@mui/material";
import downArrow from '../../assets/images/downArrow.svg'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const CustomFilter = ({ menuName, options = [], onSelect, disabled = false }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selected, setSelected] = useState("");

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    const handleSelect = (option) => {
        const label = typeof option === "string" ? option : option.label;
        const value = typeof option === "string" ? option : option.value;

        setSelected({ label, value });
        onSelect && onSelect(value); // 🔹 send only the ID/value back
        handleClose();
    };

    return (
        <Box>
            <Button
                onClick={handleOpen}
                // endIcon={<ArrowDropDownIcon />}
                variant="outlined"
                disabled={disabled}
                sx={{ borderRadius: '6px', display: 'flex', gap: '10px', border: '1px solid var(--light-gray)', fontWeight: 400, width: '130px', padding: '8px 8px' }}
            >
                <Typography
                    sx={{
                        color: '#878787',
                        fontSize: '14px',
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        textAlign: "left"
                    }}
                >
                    {selected?.label || selected || menuName}
                </Typography>
                <img src={downArrow} alt="down arrow" />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {options.map((option, index) => {
                    const label = typeof option === "string" ? option : option.label;
                    const value = typeof option === "string" ? option : option.value;

                    return (
                        <MenuItem
                            key={value ?? index}
                            onClick={() => handleSelect(option)}
                            selected={selected?.value ? selected.value === value : selected === option}
                        >
                            <Typography>{label}</Typography>
                        </MenuItem>
                    );
                })}

            </Menu>
        </Box>
    );
};

export default CustomFilter;
