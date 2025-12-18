import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography, Box
} from "@mui/material";


const ConfirmationPopUp = ({ open, onClose, onConfirm, title, BtnColor = 'var(--Blue)', message, BtnText, icon, closeBtn = true }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth >
            <DialogTitle
                textAlign="center"
                sx={{ fontSize: "32px", fontWeight: 600, pt: 3 }}
            >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                    <img
                        src={icon}
                        alt={title}
                        style={{ width: "70px", height: "70px" }}
                    />
                    {title}
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" fontWeight={400} sx={{ color: '#878787', textAlign: 'center' }}>{message}</Typography>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 1, pb: 3 }}>
                {closeBtn && <Button
                    variant="outlined"
                    sx={{ borderRadius: '8px', color: '#878787', fontSize: '16px', fontWeight: 400, border: '1px solid #D1D5DB' }}
                    onClick={onClose}
                >
                    Cancel
                </Button>}
                <Button
                    variant="contained"
                    sx={{ borderRadius: '8px', backgroundColor: BtnColor, color: 'white', fontSize: '16px', fontWeight: 400, }}
                    onClick={onConfirm}
                >
                    {BtnText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationPopUp;


