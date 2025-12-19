import React, { useState } from 'react'
import { Box, Grid, Typography, Stack, Avatar, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip, Drawer, TextField, InputAdornment, Switch } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomPagination from '../../common/custom/CustomPagination'
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';

const VendorData = {
    data: [
        {
            id: 1,
            name: "Power House Gym",
            category: "Gym",
            email: "powerhouse@yopmail.com",
            phone: "+91 98765 43210",
            location: "Mumbai, Maharashtra",
            status: "active",
            instructorsCount: 12,
            createdAt: "2024-06-01",
        },
        {
            id: 2,
            name: "Zen Yoga Studio",
            category: "Yoga",
            email: "zenyoga@yopmail.com",
            phone: "+91 91234 56789",
            location: "Pune, Maharashtra",
            status: "active",
            instructorsCount: 5,
            createdAt: "2024-06-12",
        },
        {
            id: 3,
            name: "Elite Fitness Club",
            category: "Fitness Center",
            email: "elitefitness@yopmail.com",
            phone: "+91 99887 66554",
            location: "Ahmedabad, Gujarat",
            status: "suspended",
            instructorsCount: 8,
            createdAt: "2024-05-20",
        },
        {
            id: 4,
            name: "Calm Mind Wellness",
            category: "Meditation",
            email: "calmmind@yopmail.com",
            phone: "+91 90909 11223",
            location: "Bangalore, Karnataka",
            status: "active",
            instructorsCount: 3,
            createdAt: "2024-04-18",
        },
    ],
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalCount: 4,
    },
};


const ListOfVendor = () => {
    const isLoading = false
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [vendors, setVendors] = useState(VendorData.data);
    const isVendorActive = (status) => status === 'active';
    const nav = useNavigate()


    const totalUsers = VendorData?.pagination?.totalCount;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);
    const statusColorMap = {
        active: {
            color: '#10B981',
            border: '#10B981',
        },
        pending: {
            color: '#F59E0B',
            border: '#F59E0B',
        },
        suspended: {
            color: '#EF4444',
            border: '#EF4444',
        },
    };
    const filteredVendors = VendorData?.data?.filter((v) =>
        v.name.toLowerCase().includes(filter.toLowerCase()) ||
        v.email.toLowerCase().includes(filter.toLowerCase())
    );



    return (
        <>
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                    <Grid size={{ xs: 12, lg: 5 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                        <Typography variant="h6" fontWeight={590}>
                            List Of Vendors
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, lg: 7 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>

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
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'var(--light-gray)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'var(--light-gray)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'var(--light-gray)',
                                    },
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
                    <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>
                ) : Array.isArray(VendorData?.data) && VendorData?.data?.length > 0 ? (
                    <>

                        <TableContainer >
                            <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow >
                                        <TableCell sx={tableHeaderCellSx}>Vendor</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Category</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Contact</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Location</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Instructors</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Status</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredVendors?.map((vendor) => {
                                        const statusStyle = statusColorMap[vendor.status];

                                        return (
                                            <TableRow key={vendor.id}>
                                                <TableCell>
                                                    {/* <Stack direction="row" alignItems="center" gap={1}>
                                                        <Avatar>
                                                            <PersonIcon />
                                                        </Avatar>
                                                        
                                                    </Stack> */}
                                                    <Typography fontWeight={500}>{vendor.name}</Typography>
                                                </TableCell>


                                                <TableCell>{vendor.category}</TableCell>


                                                <TableCell>
                                                    <Typography fontSize={14}>{vendor.email}</Typography>
                                                    <Typography fontSize={13} color="text.secondary">
                                                        {vendor.phone}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>{vendor.location}</TableCell>

                                                <TableCell>{vendor.instructorsCount}</TableCell>

                                                {/* Status */}
                                                <TableCell>

                                                    <Switch
                                                        checked={isVendorActive(vendor.status)}
                                                        onChange={() => handleStatusToggle(vendor.id)}
                                                        sx={{
                                                            '& .MuiSwitch-switchBase.Mui-checked': {
                                                                color: '#B57EDC',
                                                            },
                                                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                                                backgroundColor: '#B57EDC',
                                                            },
                                                            '& .MuiSwitch-track': {
                                                                backgroundColor: 'black',
                                                            },
                                                        }}
                                                    />


                                                </TableCell>

                                                <TableCell>
                                                    <Stack direction="row" spacing={1}>
                                                        <IconButton size="small" onClick={() => nav(`/home/vendors/vendor-view/${vendor.id}`)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        <IconButton size="small" color="error">
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>

                        <CustomPagination totalPages={totalPages} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} currentPage={currentPage} />


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

export default ListOfVendor

const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};