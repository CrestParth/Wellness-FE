import React, { useState } from "react";
import { Box, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, TableSortLabel, Stack, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { startOfYear } from "date-fns";
import Search from '@mui/icons-material/Search'
import CustomDateRangePicker from '../../common/custom/CustomDateRangePicker'
import { useNavigate } from "react-router-dom";
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';
import { useGetVibes } from "../../Api/Api";
import CustomPagination from '../../common/custom/CustomPagination'

const ListOfVibeChecks = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filter, setFilter] = useState("");
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

    const { data, isLoading } = useGetVibes(currentPage, rowsPerPage,startDate,endDate,filter,sortBy,sortOrder);

    const userData = data?.data?.vibes || [];
    const pagination = data?.data?.pagination;

    const totalUsers = pagination?.total || 0;
    const totalPages = pagination?.totalPages || 0;

    const changeSortOrder = (e) => {
        const field = e.target.id;

        if (field !== sortBy) {
            setSortBy(field);
            setSortOrder("asc");
        } else {
            setSortOrder(p => p === 'asc' ? 'desc' : 'asc')
        }
    }

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
                    <CustomDateRangePicker value={range} onChange={setRange} />
                </Grid>
            </Grid>



            {/* Table */}
            {isLoading ? (
                <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>
            ) : Array.isArray(userData) && userData?.length > 0 ? (
                <>
                    <TableContainer>
                        <Table sx={{ minWidth: '900px', '& .MuiTableCell-root': { fontSize: '15px' } }}>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>

                                <TableRow>
                                    <TableCell sx={tableHeaderCellSx}>
                                        <TableSortLabel
                                            id="displayName"
                                            active={sortBy === 'displayName'}
                                            direction={sortOrder}
                                            onClick={changeSortOrder}
                                            IconComponent={() => <img src={sortBy === 'displayName' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                        >
                                            Instructor
                                        </TableSortLabel></TableCell>
                                    <TableCell sx={tableHeaderCellSx}>
                                        <TableSortLabel
                                            id="firstName"
                                            active={sortBy === 'firstName'}
                                            direction={sortOrder}
                                            onClick={changeSortOrder}
                                            IconComponent={() => <img src={sortBy === 'firstName' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                        >
                                            User
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={tableHeaderCellSx}>
                                        Class Style
                                    </TableCell>
                                    <TableCell sx={tableHeaderCellSx}>
                                        <TableSortLabel
                                            id="createdAt"
                                            active={sortBy === 'createdAt'}
                                            direction={sortOrder}
                                            onClick={changeSortOrder}
                                            IconComponent={() => <img src={sortBy === 'createdAt' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                        >
                                            Date
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {userData?.map((vibe) => (
                                    <TableRow key={vibe.id}>
                                        <TableCell>{vibe?.instructor?.displayName || "-"}</TableCell>
                                        <TableCell>{`${vibe.user?.firstName || ""} ${vibe.user?.lastName || ""}`.trim() || "-"}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={1} flexWrap="wrap">
                                                {vibe?.classStyle?.slice(0, 3).map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag.name}
                                                        size="medium"
                                                        sx={{
                                                            border: "1px solid #A855F7",
                                                            color: "#A855F7",
                                                            backgroundColor: "transparent",
                                                            fontWeight: 500
                                                        }}
                                                    />
                                                ))}

                                                {vibe?.classStyle?.length > 3 && (
                                                    <Chip
                                                        label={`+${vibe?.classStyle?.length - 3}`}
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
                                        <TableCell>{new Date(vibe.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell align="center">
                                            <Stack direction="row" justifyContent="center" spacing={1}>
                                                <IconButton
                                                    onClick={() =>
                                                        nav(`/home/vibe/vibe-view/${vibe.id}`)
                                                    }
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>

                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <CustomPagination totalPages={totalPages} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} currentPage={currentPage} />
                </>) : (<Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>
                    No data found
                </Typography>)}


        </Box>
    );
};

export default ListOfVibeChecks;

const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};