import React, { useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, Grid, Stack, Switch, InputAdornment, MenuItem, Button, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
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
        teachesAt: ["FitZone", "LifeFitness", "Fitness", "Iron Gym", "Urban Lab"],
        time: "5 AM – 9 AM",
        vibeChecks: 5,
        verified: true,
        email: "michael.johnson@yopmail.com",
        phone: "+1 310 555 7821",
    },
    {
        id: 4,
        name: "Emily Carter",
        studio: "Mind & Body Wellness",
        services: ["Pilates", "Mobility Training"],
        teachesAt: ["FitZone", "LifeFitness", "Fitness"],
        time: "8 AM – 12 PM",
        vibeChecks: 2,
        verified: false,
        email: "emily.carter@yopmail.com",
        phone: "+1 512 555 4390",
    },
    {
        id: 5,
        name: "David Wilson",
        studio: "Peak Performance Studio",
        services: ["HIIT", "Weight Loss Coaching"],
        teachesAt: ["Iron Gym", "Urban Lab"],
        time: "6 PM – 9 PM",
        verified: true,
        vibeChecks: 3,
        email: "david.wilson@yopmail.com",
        phone: "+1 917 555 2684",
    },
    {
        id: 6,
        name: "Jessica Martinez",
        studio: "Balance Yoga Collective",
        services: ["Hatha Yoga", "Vinyasa Flow"],
        teachesAt: ["Urban Lab"],
        time: "6 AM – 8 AM",
        verified: true,
        vibeChecks: 4,
        email: "jessica.martinez@yopmail.com",
        phone: "+1 619 555 9043",
    },
    {
        id: 7,
        name: "Ryan Thompson",
        studio: "Urban Strength Lab",
        services: ["Personal Training", "Functional Training"],
        teachesAt: ["FitZone", "LifeFitness", "Fitness"],
        time: "4 PM – 8 PM",
        vibeChecks: 1,
        verified: false,
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



            <TableContainer >
                <Table sx={{ minWidth: '850px', '& .MuiTableCell-root': { fontSize: '15px' } }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={tableHeaderCellSx}>Name</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Teaches At</TableCell>

                            <TableCell sx={{
                                backgroundColor: '#F9FAFB',
                                color: '#878787', textAlign: 'center'
                            }}>Vibe Checks</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Status</TableCell>

                            <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filtered.map((i) => {
                            const statusLabel = i.verified ? "Verified" : "Pending";
                            const statusStyle = statusColorMap[statusLabel];

                            return (
                                <TableRow key={i.id}>
                                    <TableCell sx={{ fontWeight: 500 }}>{i.name}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1} flexWrap="wrap">
                                            {i.teachesAt?.slice(0, 3).map((tag, index) => (
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

                                            {i.teachesAt?.length > 3 && (
                                                <Chip
                                                    label={`+${i.teachesAt.length - 3}`}
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
                                            {/* {i.status === 'pending' && (
                                            <Tooltip title="Approve Instructor">
                                                <IconButton
                                                    sx={{ color: '#16A34A' }}
                                                    onClick={() => {
                                                        setSelectedId(i.id);
                                                        handleOpen('approve');
                                                    }}
                                                >
                                                    <CheckIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )} */}
                                            <IconButton onClick={() => nav(`/home/instructors/instructor-view/${i.id}`)}>
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