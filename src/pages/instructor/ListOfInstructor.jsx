import React, { useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, Grid, Stack, InputAdornment, MenuItem, Button, TableSortLabel } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetInstructors } from "../../Api/Api";
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';
import CustomPagination from "../../common/custom/CustomPagination";

const ListOfInstructor = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState("asc");
    const nav = useNavigate()

    const statusColorMap = {
        Verified: {
            color: '#7BC8A9',
            border: '#10B981',
            bg: '#ECFDF5'
        },
        Pending: {
            color: '#FF927C',
            border: '#EF4444',
            bg: '#FEF2F2'
        }
    };
    const changeSortOrder = (e) => {
        const field = e.target.id;

        if (field !== sortBy) {
            setSortBy(field);
            setSortOrder("asc");
        } else {
            setSortOrder(p => p === 'asc' ? 'desc' : 'asc')
        }
    }

    const { data, isLoading } = useGetInstructors(currentPage, rowsPerPage)
    const instructorData = data?.data

    const totalUsers = instructorData?.pagination?.total;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        List of Instructors
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
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

                    <TextField
                        select
                        label="Filter by Status"
                        fullWidth
                        value={statusFilter}
                        size="small"
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        {["pending", "verified"].map((r) => (
                            <MenuItem key={r} value={r}>
                                {r}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button sx={{ width: '400px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--Blue)', color: 'white' }} onClick={() => nav('/home/instructors/add-instructor')}>
                        <AddIcon />
                        Add Instructor
                    </Button>
                </Grid>
            </Grid>


            {isLoading ? (
                <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>) : (Array.isArray(instructorData?.instructors) && instructorData?.instructors?.length > 0 ? (
                    <>
                        <TableContainer >
                            <Table sx={{ minWidth: '900px', '& .MuiTableCell-root': { fontSize: '15px' } }}>
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
                                            color: '#878787', textAlign: 'center'
                                        }}>
                                            <TableSortLabel
                                                id="vibeChecks"
                                                active={sortBy === 'vibeChecks'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'vibeChecks' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Vibe Checks
                                            </TableSortLabel></TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Status</TableCell>

                                        <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {instructorData?.instructors?.map((i) => {
                                        const statusLabel = i?.instructorProfile?.status ? "Verified" : "Pending";
                                        const statusStyle = statusColorMap[statusLabel];

                                        return (
                                            <TableRow key={i.id}>
                                                <TableCell sx={{ fontWeight: 500 }}>{i.firstName}
                                                    {i.lastName}
                                                </TableCell>
                                                <TableCell sx={{ width: '100%' }}>
                                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                                        {i?.instructorProfile?.teachesAt?.slice(0, 3).map((tag, index) => (
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

                                                        {i?.instructorProfile?.teachesAt?.length > 3 && (
                                                            <Chip
                                                                label={`+${i?.instructorProfile?.teachesAt.length - 3}`}
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

                                                <TableCell>
                                                    <Stack direction="row" justifyContent={"center"} spacing={1}>
                                                        <Typography fontWeight={500} >
                                                            {i.vibeChecks || 0}
                                                        </Typography>
                                                    </Stack></TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={statusLabel}
                                                        sx={{
                                                            backgroundColor: statusStyle.bg,
                                                            color: statusStyle.color,
                                                            border: `1px solid ${statusStyle.border}`,
                                                            '& .MuiChip-label': {
                                                                textTransform: 'capitalize',
                                                                fontWeight: 500,
                                                            }
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell >
                                                    <Stack direction="row" justifyContent={"center"} spacing={1}>
                                                        <IconButton onClick={() => nav(`/home/instructors/instructor-view/${i?.instructorProfile?.id}`)}>
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
        </Box>
    );
};

export default ListOfInstructor;
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};