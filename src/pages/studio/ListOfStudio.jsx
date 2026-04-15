import { useState } from 'react'
import { Box, Grid, Typography, Stack, Avatar, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, InputAdornment, Switch, Button, TableSortLabel, } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
import CustomPagination from '../../common/custom/CustomPagination'
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add'
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';
import { useGetStudio } from '../../Api/Api'
import Export from '../../utils/Export';



const ListOfStudio = () => {
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filter, setFilter] = useState('')
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState("asc");
    const isVendorActive = (status) => status === 'active';
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

    const { data, isLoading } = useGetStudio(currentPage, rowsPerPage, filter, sortBy, sortOrder)
    const studioData = data?.data

    const totalUsers = studioData?.pagination?.total;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    const exportColumns = [
        { label: 'Studio Name', accessor: (i) => `${i?.name || ''}`.trim() },
        {
            label: 'Location', accessor: (i) => i?.location || "-"
        },
        { label: 'Status', accessor: (i) => i?.status || "-" },
    ];

    return (
        <>
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                        <Typography variant="h6" fontWeight={590}>
                            List Of Studios
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
                        <Export
                            fileName="studios"
                            apiEndpoint="/admin/studios"
                            dataKey="studios"
                            columns={exportColumns}
                        />
                        <Button sx={{ width: '250px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--Blue)', color: 'white' }} onClick={() => nav('/home/studio/add-studio')}>
                            <AddIcon />
                            Add Studio
                        </Button>
                    </Grid>
                </Grid>

                {isLoading ? (
                    <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>
                ) : Array.isArray(studioData?.studios) && studioData?.studios?.length > 0 ? (
                    <>

                        <TableContainer >
                            <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow >
                                        <TableCell sx={tableHeaderCellSx}>
                                            <TableSortLabel
                                                id="name"
                                                active={sortBy === 'name'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'name' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Studio
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={tableHeaderCellSx}>
                                            <TableSortLabel
                                                id="location"
                                                active={sortBy === 'location'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'location' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Location
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Status</TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studioData?.studios?.map((studio) => {

                                        return (
                                            <TableRow key={studio.id}>
                                                <TableCell>
                                                    {/* <Stack direction="row" alignItems="center" gap={1}>
                                                        <Avatar>
                                                            <PersonIcon />
                                                        </Avatar>
                                                        
                                                    </Stack> */}
                                                    <Typography fontWeight={500}>{studio.name}</Typography>
                                                </TableCell>

                                                <TableCell>{studio.location}</TableCell>

                                                {/* Status */}
                                                <TableCell>

                                                    <Switch
                                                        checked={isVendorActive(studio.status)}
                                                        onChange={() => handleStatusToggle(studio.id)}
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
                                                        <IconButton size="small" onClick={() => nav(`/home/studio/studio-view/${studio.id}`)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                        {/* <IconButton size="small" color="error">
                                                            <DeleteIcon />
                                                        </IconButton> */}
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

export default ListOfStudio

const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};