import React, { useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, Grid, Stack, InputAdornment, MenuItem, Button, TableSortLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetBoostedInstructors } from "../../Api/Api";
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';
import CustomPagination from "../../common/custom/CustomPagination";

const ListOfBoosted = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState("asc");
    const nav = useNavigate()

    const changeSortOrder = (e) => {
        const field = e.target.id;

        if (field !== sortBy) {
            setSortBy(field);
            setSortOrder("asc");
        } else {
            setSortOrder(p => p === 'asc' ? 'desc' : 'asc')
        }
    }

    const { data, isLoading } = useGetBoostedInstructors(currentPage, rowsPerPage, filter, sortBy, sortOrder)
    const instructorData = data?.data

    const totalUsers = instructorData?.pagination?.total;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        List of Boosted Instructors
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
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


            {isLoading ? (
                <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>) : (Array.isArray(instructorData?.instructors) && instructorData?.instructors?.length > 0 ? (
                    <>
                        <TableContainer >
                            <Table sx={{ minWidth: '800px', '& .MuiTableCell-root': { fontSize: '15px' } }}>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow>
                                        <TableCell sx={tableHeaderCellSx}>
                                            <TableSortLabel
                                                id="firstName"
                                                active={sortBy === 'firstName'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'firstName' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Name
                                            </TableSortLabel></TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Teaches At</TableCell>

                                        <TableCell sx={{
                                            backgroundColor: '#F9FAFB',
                                            color: '#878787'
                                        }}>
                                            <TableSortLabel
                                                id="startDate"
                                                active={sortBy === 'startDate'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'startDate' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Start Date
                                            </TableSortLabel></TableCell>
                                        <TableCell sx={tableHeaderCellSx}>
                                            <TableSortLabel
                                                id="endDate"
                                                active={sortBy === 'endDate'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'endDate' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                End Date
                                            </TableSortLabel></TableCell>
                                        <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {instructorData?.instructors?.map((i) => {


                                        return (
                                            <TableRow key={i.id}>
                                                <TableCell sx={{ fontWeight: 500 }}>{i.firstName}
                                                    {i.lastName}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 220 }}>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ maxWidth: 350 }}>
                                                        {i?.instructorProfile?.teachesAt?.slice(0, 3).map((tag, index) => (
                                                            <Chip
                                                                key={index}
                                                                label={tag.studioName}
                                                                size="medium"
                                                                sx={{
                                                                    border: "1px solid #A855F7",
                                                                    color: "#A855F7",
                                                                    backgroundColor: "transparent",
                                                                    fontWeight: 500
                                                                }}
                                                            />
                                                        ))}

                                                        {i?.instructorProfile?.teachesAt?.length > 3 && (
                                                            <Chip
                                                                label={`+${i?.instructorProfile?.teachesAt.length - 3}`}
                                                                size="medium"
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

                                                <TableCell>
                                                    02/03/2026
                                                </TableCell>
                                                <TableCell>
                                                    23/08/2026
                                                </TableCell>

                                                <TableCell >
                                                    <Stack direction="row" justifyContent={"center"} spacing={1}>
                                                        <IconButton onClick={() => nav(`/home/boosted/boosted-view/${i?.instructorProfile?.id}`)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <CustomPagination totalPages={totalPages} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} currentPage={currentPage} />
                    </>
                ) : (<Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>
                    No data found
                </Typography>)
            )}
        </Box >
    );
};

export default ListOfBoosted;
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};