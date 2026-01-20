import React, { useState } from "react";
import { Box, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, MenuItem, Stack, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from '@mui/icons-material/Search'
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { useNavigate } from "react-router-dom";

const reviewData = [
    {
        id: 1,
        userName: "John Doe",
        instructorName: "Alex Trainer",
        rating: 5,
        comment: "Excellent training sessions, highly recommended!",
        date: "2024-06-10",
        isHidden: false,
    },
    {
        id: 2,
        userName: "Jane Smith",
        instructorName: "Zen Yoga Studio",
        rating: 3,
        comment: "Good experience but classes were crowded.",
        date: "2024-06-08",
        isHidden: false,
    },
    {
        id: 3,
        userName: "Michael Brown",
        instructorName: "Power House Gym",
        rating: 1,
        comment: "Trainer was unprofessional.",
        date: "2024-05-28",
        isHidden: false,
    },
];
const Review = () => {
    const [reviews, setReviews] = useState(reviewData);
    const [openPopup, setOpenPopup] = useState(null);
    const [instructorFilter, setInstructorFilter] = useState("");
    const nav = useNavigate()
    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);

    const handleConfirm = () => {
        if (openPopup === "delete") {
            toast.success('Deleted Successfully')
            setReviews((prev) => prev.filter((r) => r.id !== selectedId));
        }
        handleClose()
    }

    const filteredReviews = reviews.filter((review) => {

        const instructorMatch = instructorFilter
            ? review.instructorName
                .toLowerCase()
                .includes(instructorFilter.toLowerCase())
            : true;

        return instructorMatch;
    });

    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, sm: 5 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        List Of Vibe Checks
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 7 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>

                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        value={instructorFilter}
                        onChange={(e) => setInstructorFilter(e.target.value)}
                        fullWidth
                        sx={{
                            width: '100%',
                            height: '40px',
                            borderRadius: '8px',
                            '& .MuiInputBase-root': {
                                height: '40px',
                                fontSize: '14px',
                            },
                            '& .MuiOutlinedInput-input': {
                                padding: '10px 14px',
                            },

                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search></Search>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </Grid>



            {/* Table */}
            <TableContainer>
                <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>

                        <TableRow>
                            <TableCell sx={tableHeaderCellSx}>Instructor</TableCell>
                            <TableCell sx={tableHeaderCellSx}>User</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Note</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Date</TableCell>
                            <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredReviews.length > 0 ? (
                            filteredReviews.map((review) => (
                                <TableRow key={review.id}>
                                    <TableCell>{review.instructorName}</TableCell>
                                    <TableCell>{review.userName}</TableCell>
                                    <TableCell>{review.comment}</TableCell>
                                    <TableCell>{review.date}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <IconButton onClick={() => nav(`/home/vibe/vibe-view/${review.id}`)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={() => {
                                                    handleOpen('delete')
                                                    setSelectedId(review.id)
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No reviews found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <ConfirmationPopUp
                open={openPopup === "delete"}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title="Delete Review"
                message={`Are you sure you want to permanently delete this review?`}
                BtnText={'Delete'}
                BtnColor="red"
                icon={DeleteConfirm}
            />
        </Box>
    );
};

export default Review;

const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};