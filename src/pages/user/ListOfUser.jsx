import { useState , useEffect} from 'react'
import { Box, Grid, Typography, Stack, Avatar, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TextField, InputAdornment, TableSortLabel, } from "@mui/material";
import CustomPagination from '../../common/custom/CustomPagination'
import Search from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate , useSearchParams } from 'react-router-dom';
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';
import { useGetUser } from '../../Api/Api'
import Export from '../../utils/Export';

const ListOfUser = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rowsPerPage, setRowsPerPage] = useState(
    Number(searchParams.get("rows")) || 5
    );
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );
    const [filter, setFilter] = useState('')
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState("asc");
    const navigate = useNavigate()

    useEffect(() => {
    setSearchParams({
        page: currentPage.toString(),
        rows: rowsPerPage.toString(),
    });
    }, [currentPage, rowsPerPage, setSearchParams]);

    const { data, isLoading } = useGetUser(currentPage, rowsPerPage, filter, sortBy, sortOrder);
    const statusColorMap = {
        active: {
            color: '#7BC8A9',
            border: '#10B981',
            bg: '#ECFDF5'
        },
        suspended: {
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
    const userData = data?.data?.users || [];
    const pagination = data?.data?.pagination;

    const totalUsers = pagination?.total || 0;
    const totalPages = pagination?.totalPages || 0;


    const exportColumns = [
        { label: 'Name', accessor: (i) => `${i?.firstName || ''} ${i?.lastName || ''}`.trim() },
        {
            label: 'Teaches At', accessor: (i) => i?.email || " "
        },
        { label: 'Vibe Checks', accessor: (i) => i?.TotalVibeGiven || 0 },
    ];

    return (
        <>
            <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>

                    <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                        <Typography variant="h6" fontWeight={590}>
                            List Of Users
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
                        <Export
                            fileName="users"
                            apiEndpoint="/admin/users"
                            dataKey="users"
                            columns={exportColumns}
                        />
                    </Grid>
                </Grid>


                {isLoading ? (
                    <Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>Loading....</Typography>
                ) : Array.isArray(userData) && userData?.length > 0 ? (
                    <>

                        <TableContainer >
                            <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow >
                                        <TableCell sx={{
                                            backgroundColor: '#F9FAFB',
                                            color: '#878787', paddingLeft: '30px'
                                        }}>
                                            <TableSortLabel
                                                id="firstName"
                                                active={sortBy === 'firstName'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'firstName' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Name
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell sx={tableHeaderCellSx}>
                                            <TableSortLabel
                                                id="email"
                                                active={sortBy === 'email'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'email' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Email
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="center" sx={tableHeaderCellSx}>
                                            <TableSortLabel
                                                id="TotalVibeGiven"
                                                active={sortBy === 'TotalVibeGiven'}
                                                direction={sortOrder}
                                                onClick={changeSortOrder}
                                                IconComponent={() => <img src={sortBy === 'TotalVibeGiven' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Vibe Given
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell align="center" sx={tableHeaderCellSx}>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userData?.map((user) => {
                                        const statusStyle = statusColorMap[user.status];
                                        return (
                                            <TableRow key={user.id}>
                                                <TableCell sx={{ paddingLeft: '30px' }}>
                                                    <Stack direction="row" alignItems="center" gap={1}>

                                                        <Avatar src={user?.profileImage || undefined}>
                                                            <PersonIcon />
                                                        </Avatar>

                                                        {user?.firstName || user?.lastName ? `${user?.firstName || ""} ${user?.lastName || ""}`.trim() : "-"}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ fontWeight: 500 }}>
                                                    {user.email || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    <Stack direction="row" alignItems="center" justifyContent={'center'} gap={1}>
                                                        <Typography fontWeight={500} >
                                                            {user?.TotalVibeGiven || 0}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell >
                                                    <Stack direction="row" justifyContent={"center"} spacing={1}>

                                                        <IconButton onClick={() => navigate(`/home/users/user-view/${user.id}`)}>
                                                            <VisibilityIcon />
                                                        </IconButton>
                                                    </Stack>
                                                </TableCell>

                                            </TableRow>
                                        )
                                    }
                                    )}
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

export default ListOfUser

const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};