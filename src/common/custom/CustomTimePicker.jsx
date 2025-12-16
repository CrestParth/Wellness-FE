import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { BootstrapInput } from "./BootstrapInput";
import clock from "../../assets/images/clock.svg";

const CustomTimePicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(value || "");

    const handleConfirm = () => {
        onChange(tempValue);
        setOpen(false);
    };

    return (
        <>
            <BootstrapInput
                value={value || ""}
                placeholder="Select"
                onClick={() => setOpen(true)}
                readOnly
                fullWidth
                endAdornment={
                    <div className="input-icon" onClick={() => setOpen(true)}>
                        <img src={clock} alt="clock" style={{ width: 20, height: 20 }} />
                    </div>
                }
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent sx={{ display: "flex", justifyContent: "center", minWidth: 250 }}>
                    <TimePicker
                        onChange={setTempValue}
                        value={tempValue}
                        disableClock
                        clearIcon={null}
                        format="hh:mm a" // ⏰ shows AM/PM
                        hourPlaceholder="HH"
                        minutePlaceholder="MM"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} sx={{ color: 'black' }}>Cancel</Button>
                    <Button onClick={handleConfirm} variant="contained" sx={{ color: 'white' }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomTimePicker;
