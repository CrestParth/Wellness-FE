import React, { useState } from "react";
import { Box, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, MenuItem, Stack, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { startOfYear } from "date-fns";
import Search from '@mui/icons-material/Search'
import CustomDateRangePicker from '../../common/custom/CustomDateRangePicker'
import { useNavigate } from "react-router-dom";

const reviewData = [
    {
        id: 1,
        userName: "John Doe",
        instructorName: "Alex Trainer",
        rating: 5,
        comment: "Excellent training sessions, highly recommended!",
        tags: ["Strength", "Yoga", "Fitness", "Strength"],
        date: "06-10-2025",
        isHidden: false,
    },
    {
        id: 2,
        userName: "Jane Smith",
        instructorName: "Zen Yoga Studio",
        rating: 3,
        tags: ["Strength", "Yoga", "Fitness"],
        comment: "Good experience but classes were crowded.",
        date: "06-01-2023",
        isHidden: false,
    },
    {
        id: 3,
        userName: "Michael Brown",
        instructorName: "Power House Gym",
        rating: 1,
        tags: ["Strength", "Yoga", "Fitness"],
        comment: "Trainer was unprofessional.",
        date: "06-03-2024",
        isHidden: false,
    },
];
const ListOfVibeChecks = () => {
    const [reviews, setReviews] = useState(reviewData);
    const [instructorFilter, setInstructorFilter] = useState("");
    const [range, setRange] = useState([
        {
            startDate: startOfYear(new Date()),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const startDate = range[0].startDate.toISOString();
    const endDate = range[0].endDate.toISOString();
    const nav = useNavigate()

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
                    <CustomDateRangePicker value={range} onChange={setRange} />
                </Grid>
            </Grid>



            {/* Table */}
            <TableContainer>
                <Table sx={{ minWidth: '900px', '& .MuiTableCell-root': { fontSize: '15px' } }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>

                        <TableRow>
                            <TableCell sx={tableHeaderCellSx}>Instructor</TableCell>
                            <TableCell sx={tableHeaderCellSx}>User</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Class Style</TableCell>
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
                                    <TableCell>
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {review.tags?.slice(0, 3).map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    label={tag}
                                                    size="medium"
                                                    sx={{
                                                        border: "1px solid #A855F7",
                                                        color: "#A855F7",
                                                        backgroundColor: "transparent",
                                                        fontWeight: 500
                                                    }}
                                                />
                                            ))}

                                            {review.tags?.length > 3 && (
                                                <Chip
                                                    label={`+${review.tags.length - 3}`}
                                                    size="meduim"
                                                    sx={{
                                                        border: "1px solid #A855F7",
                                                        color: "#A855F7",
                                                        backgroundColor: "transparent",
                                                        fontWeight: 500
                                                    }}
                                                />
                                            )}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{review.date}</TableCell>
                                    <TableCell align="center">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <IconButton onClick={() => nav(`/home/vibe/vibe-view/${review.id}`)}>
                                                <VisibilityIcon />
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

        </Box>
    );
};

export default ListOfVibeChecks;

const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};