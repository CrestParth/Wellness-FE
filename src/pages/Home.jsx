import { Typography, Box, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, Stack, Chip, IconButton, Button } from '@mui/material'
import React, { useState } from 'react'
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from 'react-router-dom';
import { useGetBoostedInstructors, useGetDashboard } from "../Api/Api";
import arrowup from '../assets/images/arrowup.svg';
import arrowdown from '../assets/images/arrowdown.svg';
import arrownuteral from '../assets/images/arrownuteral.svg';
import { FormateDate } from '../utils/FormateDate';


const StatCard = ({ title, value, bg, placeholder }) => (
    <Box
        sx={{
            height: "100%",
            backgroundColor: bg,
            borderRadius: "16px",
            px: 3,
            py: 2,
        }}
    >
        <Typography variant="body1" color="#878787">
            {title}
        </Typography>
        <Typography variant="h4" fontWeight={600} mt={1}>
            {value}
        </Typography>
        {/* <Typography variant="body2" color="#878787" mt={1}>
            {placeholder}
        </Typography> */}
    </Box>
);


const Home = () => {
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

    const { data: analyticsData } = useGetDashboard()
    const analytics = analyticsData?.data

    const { data, isLoading } = useGetBoostedInstructors(1, 5)
    const instructorData = data?.data
    return (
        <>
            <Box sx={{ p: { xs: 0, sm: 2 } }}>
                <Grid container spacing={3} mb={5}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <StatCard
                            title="Total Instructors"
                            value={analytics?.totalInstructors ?? 0}
                            bg="rgba(27, 120, 170, 0.2)"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <StatCard
                            title="Total Studios"
                            value={analytics?.totalStudios ?? 0}
                            bg="#6C63FF33"
                        />
                    </Grid>

                    {/* <Grid size={{ xs: 12, md: 3 }}>
                        <StatCard
                            title="Pending Approvals"
                            value={dashboardData.stats.pendingInstructors}
                            bg="#aa971b33"
                        />
                    </Grid> */}

                    <Grid size={{ xs: 12, md: 4 }}>
                        <StatCard
                            title="New Instructor Signups"
                            value={analytics?.newInstructorSignupsThisMonth ?? 0}
                            bg="rgba(27, 170, 144, 0.2)"
                            placeholder='this month'
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    p: 0,
                    my: 5,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                    <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                        <Typography variant="h6" fontWeight={600}>
                            List of Boosted Instructors
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                        <Button sx={{ width: '130px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--Blue)', color: 'white' }} onClick={() => nav('/home/boosted')}>
                            View more
                        </Button>
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
                                                        {i.name}
                                                    </TableCell>
                                                    <TableCell sx={{ minWidth: 220 }}>
                                                        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ maxWidth: 350 }}>
                                                            {i?.teachesAt?.slice(0, 3).map((tag, index) => (
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

                                                            {i?.teachesAt?.length > 3 && (
                                                                <Chip
                                                                    label={`+${i?.teachesAt.length - 3}`}
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
                                                        {FormateDate(i?.startDate)}
                                                    </TableCell>
                                                    <TableCell>
                                                        {FormateDate(i?.endDate)}
                                                    </TableCell>

                                                    <TableCell >
                                                        <Stack direction="row" justifyContent={"center"} spacing={1}>
                                                            <IconButton onClick={() => nav(`/home/boosted/boosted-view/${i?.id}`)}>
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
                        </>
                    ) : (<Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>
                        No data found
                    </Typography>)
                )}
            </Box>

            <Box
                sx={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "16px",
                    p: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
            >
                <Typography variant="h6" fontWeight={600} mb={2}>
                    Quick Actions
                </Typography>

                <Grid container spacing={2}>
                    <Grid
                        size={{ xs: 12, md: 4 }}
                        sx={{
                            p: 2,
                            borderRadius: "12px",
                            border: "1px solid #B57EDC",
                            cursor: "pointer"
                        }}
                        onClick={() => nav('/home/instructors/add-instructor')}
                    >
                        <Typography fontWeight={500}>
                            Add Instructors
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create new instructor profiles
                        </Typography>
                    </Grid>



                    <Grid
                        size={{ xs: 12, md: 4 }}
                        sx={{
                            p: 2,
                            borderRadius: "12px",
                            border: "1px solid #B57EDC",
                            cursor: "pointer"
                        }}
                        onClick={() => nav('/home/studio/add-studio')}
                    >
                        <Typography fontWeight={500}>
                            Add Studio
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create studio information
                        </Typography>
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: 4 }}
                        sx={{
                            p: 2,
                            borderRadius: "12px",
                            border: "1px solid #B57EDC",
                            cursor: "pointer"
                        }}
                        onClick={() => nav('/home/vibe')}
                    >
                        <Typography fontWeight={500}>
                            Manage Vibe Checks
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Review and moderate user-submitted vibe checks
                        </Typography>
                    </Grid>
                </Grid>

            </Box>


        </>
    )
}

export default Home
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};