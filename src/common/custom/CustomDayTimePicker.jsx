import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
} from "@mui/material";
import { DayPicker } from "react-day-picker";
import TimePicker from "react-time-picker";
import "react-day-picker/dist/style.css";
import "react-time-picker/dist/TimePicker.css";
import { BootstrapInput } from "./BootstrapInput";
import calender from "../../assets/images/calender.svg";
import { formatDate } from '../../utils/DateFormater'
import { toast } from "react-toastify";


const CustomDayTimePicker = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);


    // Separate temp states for date & time
    const [tempDate, setTempDate] = useState("");
    const [tempTime, setTempTime] = useState("");

    useEffect(() => {
        if (value) {
            const dateObj = new Date(value);
            setTempDate(dateObj);

            const hours = String(dateObj.getHours()).padStart(2, "0");
            const minutes = String(dateObj.getMinutes()).padStart(2, "0");

            setTempTime(`${hours}:${minutes}`);
        }
    }, [value]);

    const handleConfirm = () => {
        if (!tempDate) {
            toast.error("Please select a date.")
            return
        }
        if (!tempTime) {
            toast.error("Please select time.")
            return
        }


        const [hours, minutes] = tempTime.split(":").map(Number);
        const finalDate = new Date(tempDate);
        finalDate.setHours(hours);
        finalDate.setMinutes(minutes);
        finalDate.setSeconds(0);
        finalDate.setMilliseconds(0);

        onChange(finalDate.toISOString());
        setOpen(false);
    };



    return (
        <>
            <BootstrapInput
                sx={{ cursor: "pointer" }}
                value={
                    value
                        ? `${formatDate(tempDate)} ${tempTime || ""}`
                        : ""
                }
                // value={formatDate(value)}
                placeholder="Select date & time"
                onClick={() => setOpen(true)}
                readOnly
                fullWidth
                endAdornment={
                    <div className="input-icon" onClick={() => setOpen(true)}>
                        <img src={calender} alt="calendar" style={{ width: 20, height: 20 }} />
                    </div>
                }
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Date Picker */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={500} mb={1}>
                            Select Date
                        </Typography>
                        <DayPicker
                            mode="single"
                            selected={tempDate}
                            onSelect={setTempDate}
                            styles={{
                                day: { borderRadius: "8px" },
                                day_selected: {
                                    backgroundColor: "var(--Blue)",
                                    color: "white",
                                },
                                nav_button: { color: "black" },
                            }}
                        />
                    </Box>

                    {/* Time Picker */}
                    <Box>
                        <Typography variant="subtitle1" fontWeight={500} mb={1}>
                            Select Time
                        </Typography>
                        <TimePicker
                            onChange={setTempTime}
                            value={tempTime}
                            disableClock
                            clearIcon={null}
                            format="HH:mm"
                            hourPlaceholder="HH"
                            minutePlaceholder="MM"
                        />
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)} sx={{ color: 'black' }}>Cancel</Button>
                    <Button
                        onClick={() => {
                            setTempDate(null);
                            setTempTime("");
                            onChange("");
                            setOpen(false);
                        }}
                        sx={{ color: 'black' }}
                    >
                        Clear
                    </Button>
                    <Button onClick={handleConfirm} sx={{ color: 'white' }} variant="contained">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CustomDayTimePicker;
