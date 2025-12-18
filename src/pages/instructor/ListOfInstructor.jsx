import React, { useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, Grid, Stack, Switch, InputAdornment, MenuItem, Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import DeleteConfirm from '../../assets/images/DeleteIcon.svg'
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';


const instructorData = [
    {
        id: 3,
        name: "Michael Johnson",
        studio: "Iron Core Fitness",
        services: ["Strength Training", "CrossFit"],
        location: "Los Angeles, California, USA",
        time: "5 AM – 9 AM",
        status: "approved",
        email: "michael.johnson@yopmail.com",
        phone: "+1 310 555 7821",
    },
    {
        id: 4,
        name: "Emily Carter",
        studio: "Mind & Body Wellness",
        services: ["Pilates", "Mobility Training"],
        location: "Austin, Texas, USA",
        time: "8 AM – 12 PM",
        status: "pending",
        email: "emily.carter@yopmail.com",
        phone: "+1 512 555 4390",
    },
    {
        id: 5,
        name: "David Wilson",
        studio: "Peak Performance Studio",
        services: ["HIIT", "Weight Loss Coaching"],
        location: "New York City, USA",
        time: "6 PM – 9 PM",
        status: "suspended",
        email: "david.wilson@yopmail.com",
        phone: "+1 917 555 2684",
    },
    {
        id: 6,
        name: "Jessica Martinez",
        studio: "Balance Yoga Collective",
        services: ["Hatha Yoga", "Vinyasa Flow"],
        location: "San Diego, California, USA",
        time: "6 AM – 8 AM",
        status: "approved",
        email: "jessica.martinez@yopmail.com",
        phone: "+1 619 555 9043",
    },
    {
        id: 7,
        name: "Ryan Thompson",
        studio: "Urban Strength Lab",
        services: ["Personal Training", "Functional Training"],
        location: "Chicago, Illinois, USA",
        time: "4 PM – 8 PM",
        status: "pending",
        email: "ryan.thompson@yopmail.com",
        phone: "+1 312 555 7718",
    },

];

const ListOfInstructor = () => {
    const [instructors, setInstructors] = useState(instructorData);
    const [openPopup, setOpenPopup] = useState(null);
    const [filter, setFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [selectedId, setSelectedId] = useState(null);

    const nav = useNavigate()

    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);

    const handleConfirm = () => {
        if (openPopup === "delete") {
            toast.success('Deleted Successfully')
        }
        if (openPopup === "approve") {
            setInstructors(prev =>
                prev.map(i =>
                    i.id === selectedId ? { ...i, status: 'approved' } : i
                )
            );
            toast.success('Instructor approved successfully');
        }
        handleClose()
    }

    const handleStatusToggle = (id) => {
        setInstructors((prev) =>
            prev.map((i) =>
                i.id === id
                    ? {
                        ...i,
                        status: i.status === "approved" ? "suspended" : "approved",
                    }
                    : i
            )
        );
    };



    const filtered = instructors.filter(
        (i) =>
            i.name.toLowerCase().includes(filter.toLowerCase()) ||
            i.studio.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        List of Instructors
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 8 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
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
                        {["pending", "suspended", "approved"].map((r) => (
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



            <TableContainer>
                <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={tableHeaderCellSx}>Name</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Studio</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Services</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Location</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
                            <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filtered.map((i) => (
                            <TableRow key={i.id}>
                                <TableCell sx={{ fontWeight: 500 }}>{i.name}</TableCell>
                                <TableCell>{i.studio}</TableCell>
                                <TableCell sx={{ color: '#4B5563' }}>{i.services.join(", ")}</TableCell>
                                <TableCell>{i.location}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={i.status === "approved"}
                                        onChange={() => handleStatusToggle(i.id)}
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

                                <TableCell >
                                    <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
                                        {i.status === 'pending' && (
                                            <Tooltip title="Approve Instructor">
                                                <IconButton
                                                    sx={{ color: '#16A34A' }} // green
                                                    onClick={() => {
                                                        setSelectedId(i.id);
                                                        handleOpen('approve');
                                                    }}
                                                >
                                                    <CheckIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        <IconButton onClick={() => nav(`/home/instructors/instructor-view/${i.id}`)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                        <Tooltip title="Delete Instructor">

                                            <IconButton color="error" onClick={() => {
                                                handleOpen('delete')
                                                setSelectedId(i.id)
                                            }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
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
            <ConfirmationPopUp
                open={openPopup === "approve"}
                onClose={handleClose}
                onConfirm={handleConfirm}
                title={"Approve Instructor"}
                message={"Are you sure you want to approve this instructor?"}
                BtnText={"Approve"}
                BtnColor={"green"}
                icon={DeleteConfirm}
            />

        </Box>
    );
};

export default ListOfInstructor;
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};