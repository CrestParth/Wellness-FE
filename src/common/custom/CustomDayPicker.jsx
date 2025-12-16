import React, { useState } from "react";
import { Dialog, DialogContent, InputAdornment, IconButton } from "@mui/material";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BootstrapInput } from "./BootstrapInput";
import calender from '../../assets/images/calender.svg'
const CustomDayPicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);

    const displayDate = value
        ? value instanceof Date
            ? value.toLocaleDateString()
            : new Date(value).toLocaleDateString()
        : "";

    return (
        <>
            <BootstrapInput
                sx={{ cursor: 'pointer' }}
                value={displayDate}
                placeholder="Select"
                onClick={() => setOpen(true)}
                readOnly
                fullWidth
                endAdornment={
                    <div className="input-icon" onClick={() => setOpen(true)}>
                        <img src={calender} alt="calendar" style={{ width: 20, height: 20 }} />
                    </div>
                }
            />

            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogContent>
                    <DayPicker
                        mode="single"
                        selected={value}
                        onSelect={(date) => {
                            onChange(date);
                            setOpen(false);
                        }}
                        styles={{
                            day: { borderRadius: "8px" },
                            day_selected: {
                                backgroundColor: "var(--Blue)",
                                color: "white",
                            },
                            nav_button: {
                                color: "black",
                            },
                        }}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CustomDayPicker;
