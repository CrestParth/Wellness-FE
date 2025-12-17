import React, { useState } from 'react'
import { Box, Grid, Typography, Stack, Avatar, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Drawer } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from '../../common/custom/CustomPagination'
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from "@mui/icons-material/Visibility";

const User = {
    data: [
        {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@yopmail.com",
            status: "active",
            reviews: [
                {
                    id: 101,
                    instructorName: "Alex Trainer",
                    rating: 4,
                    comment: "Very professional",
                    date: "2024-06-01"
                },
                {
                    id: 102,
                    instructorName: "Fit Studio",
                    rating: 5,
                    comment: "Great experience",
                    date: "2024-06-10"
                }
            ]
        },
        {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "janesmith@yopmail.com",
            status: "active"
        },

        // 🔹 New examples
        {
            id: 3,
            firstName: "Michael",
            lastName: "Brown",
            email: "michaelbrown@yopmail.com",
            status: "active",
            reviews: [
                {
                    id: 103,
                    instructorName: "Core Fitness",
                    rating: 3,
                    comment: "Good sessions but crowded gym",
                    date: "2024-05-18"
                }
            ]
        },
        {
            id: 4,
            firstName: "Emily",
            lastName: "Clark",
            email: "emilyclark@yopmail.com",
            status: "active",
            reviews: []
        },
        {
            id: 5,
            firstName: "David",
            lastName: "Wilson",
            email: "davidwilson@yopmail.com",
            status: "suspended",
            reviews: [
                {
                    id: 104,
                    instructorName: "Power House Gym",
                    rating: 2,
                    comment: "Not satisfied with personal training",
                    date: "2024-04-12"
                },
                {
                    id: 105,
                    instructorName: "Elite Fitness",
                    rating: 4,
                    comment: "Improved experience in later sessions",
                    date: "2024-06-02"
                }
            ]
        },
    ],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 5
    }
};

const ListOfUser = () => {
    const isLoading = false
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openReviews, setOpenReviews] = useState(false);

    const handleOpenReviews = (user) => {
        setSelectedUser(user);
        setOpenReviews(true);
    };
    const totalUsers = User?.pagination?.totalCount;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    const statusColorMap = {
        active: {
            color: '#7BC8A9',
            border: '#10B981',
            // bg: '#ECFDF5'
        },
        suspended: {
            color: '#FF927C',
            border: '#EF4444',
            // bg: '#FEF2F2'
        }
    };


    return (
        <>
            <Box sx={{ backgroundColor: "#1D1D1D", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 2 } }}>
                    <Typography variant="h6" fontWeight={590}>
                        List Of Users
                    </Typography>
                </Grid>

                {isLoading ? (
                    <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>
                ) : Array.isArray(User?.data) && User?.data?.length > 0 ? (
                    <>

                        <TableContainer >
                            <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px', borderBottom: '1px solid #2D2D2E' } }}>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow >
                                        <TableCell sx={{
                                            backgroundColor: '#1F1F20',
                                            color: '#878787', paddingLeft: '30px'
                                        }}>Name</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Email</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Status</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Reviews</TableCell>
                                        <TableCell sx={tableHeaderCellSx}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {User?.data?.map((user) => {
                                        const statusStyle = statusColorMap[user.status];
                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell sx={{ color: 'white', paddingLeft: '30px' }}>
                                                    <Stack direction="row" alignItems="center" gap={1}>

                                                        <Avatar src={user?.profile_img || undefined} alt="User" >
                                                            <PersonIcon />
                                                        </Avatar>

                                                        {user?.firstName || user?.lastName ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim() : "-"}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 500, color: 'white' }}>
                                                    {user.email || "-"}
                                                </TableCell>
                                                <TableCell sx={{ color: '#4B5563' }}>
                                                    <Chip
                                                        label={user.status}
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
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" gap={1}>
                                                        <Typography fontWeight={500} sx={{ color: 'white' }}>
                                                            {user.reviews?.length || 0}
                                                        </Typography>

                                                        <IconButton
                                                            size="small"
                                                            onClick={() => handleOpenReviews(user)}
                                                        >
                                                            <VisibilityIcon sx={{ color: 'white' }} fontSize="small" />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell>
                                                    <IconButton sx={{ color: 'red' }}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <CustomPagination totalPages={totalPages} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} currentPage={currentPage} />
                        <Drawer
                            anchor="right"
                            open={openReviews}
                            onClose={() => setOpenReviews(false)}

                        >
                            <Box sx={{
                                width: 420, p: 3,
                                backgroundColor: '#262626',
                                height: '100%'
                            }}>
                                <Typography variant="h6" fontWeight={600} color='white'>
                                    Reviews by {selectedUser?.firstName}
                                </Typography>

                                <Stack mt={2} gap={2}>
                                    {selectedUser?.reviews?.length > 0 ? (
                                        selectedUser.reviews.map((review) => (
                                            <Box
                                                key={review.id}
                                                sx={{
                                                    border: '1px solid #E5E7EB',
                                                    borderRadius: 2,
                                                    p: 2
                                                }}
                                            >
                                                <Typography fontWeight={500} color='white'>
                                                    {review.instructorName}
                                                </Typography>

                                                <Typography variant="body2" color='white'>
                                                    Rating: {review.rating}/5
                                                </Typography>

                                                <Typography mt={1} color='white'>
                                                    {review.comment}
                                                </Typography>
                                            </Box>
                                        ))
                                    ) : (
                                        <Typography color='white'>
                                            No reviews given by this user
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>
                        </Drawer>

                    </>
                ) : (
                    <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>
                        No data found
                    </Typography>
                )}
            </Box>

        </>
    )
}

export default ListOfUser

const tableHeaderCellSx = {
    backgroundColor: '#1F1F20',
    color: '#878787'
};