import { useState , useEffect } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Chip, TextField, Grid, Stack, InputAdornment, MenuItem, Button, TableSortLabel, Dialog, DialogContent, DialogTitle, CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from "@mui/icons-material/Visibility";
import Search from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { toast } from "react-toastify";
import { useNavigate , useSearchParams } from "react-router-dom";
import { useGetInstructors } from "../../Api/Api";
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';
import CustomPagination from "../../common/custom/CustomPagination";
import { useApproveInstructor, useRejectInstructor, useSendBulkInvitation } from "../../Api/Api";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import csvIcon from '../../assets/images/csvIcon.svg';
import excelIcon from '../../assets/images/excelIcon.svg'
import Export from '../../utils/Export'


const ListOfInstructor = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rowsPerPage, setRowsPerPage] = useState(
    Number(searchParams.get("rows")) || 5
    );
    const [currentPage, setCurrentPage] = useState(
        Number(searchParams.get("page")) || 1
    );
    const [selectedId, setSelectedId] = useState()
    const [filter, setFilter] = useState('')
    const [openPopup, setOpenPopup] = useState(null);
    const [openBulkInvite, setOpenBulkInvite] = useState(false);
    const [file, setFile] = useState(null);
    const [statusFilter, setStatusFilter] = useState('')
    const [sortBy, setSortBy] = useState("displayName");
    const [sortOrder, setSortOrder] = useState("asc");
    // apiSortBy is the key we send to backend; map UI fields to API fields
    const [apiSortBy, setApiSortBy] = useState("firstName");
    const nav = useNavigate()
    const client = useQueryClient()

    useEffect(() => {
    setSearchParams({
        page: currentPage.toString(),
        rows: rowsPerPage.toString(),
    });
    }, [currentPage, rowsPerPage, setSearchParams]);

    const statusColorMap = {
        Approved: {
            color: '#7BC8A9',
            border: '#10B981',
            bg: '#ECFDF5'
        },
        Rejected: {
            color: '#FF927C',
            border: '#EF4444',
            bg: '#FEF2F2'
        }
    };
    const changeSortOrder = (field) => {
        const mapFieldToApi = (f) => {
            if (f === 'displayName') return 'firstName';
            if (f === 'vibeChecks') return 'TotalVibeChecks';
            return f;
        };

        const backendField = mapFieldToApi(field);

        if (field !== sortBy) {
            setSortBy(field);
            setSortOrder("asc");
            setApiSortBy(backendField);
        } else {
            setSortOrder((p) => (p === "asc" ? "desc" : "asc"));
        }
    };

    const { data, isLoading } = useGetInstructors(currentPage, rowsPerPage, statusFilter, filter, apiSortBy, sortOrder)
    const instructorData = data?.data

    const { mutate: approveInstructor } = useApproveInstructor(
        () => {
            client.invalidateQueries(['instructors'], { exact: false })
            toast.success("Instructor Approved")
        },
        () => toast.error("Approval Failed")
    );

    const { mutate: rejectInstructor } = useRejectInstructor(
        () => {
            client.invalidateQueries(['instructors'], { exact: false })
            toast.success("Instructor Rejected")
        },
        () => toast.error("Rejection Failed")
    );

    const totalUsers = instructorData?.pagination?.total;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    const handleOpen = (type) => setOpenPopup(type);
    const handleClose = () => setOpenPopup(null);

    const handleConfirm = () => {
        if (openPopup === "approve") {
            approveInstructor(selectedId);
        }
        else {
            rejectInstructor(selectedId);
        }
        handleClose()
    }

    const { mutate: sendBulkInvite, isPending } = useSendBulkInvitation(
        () => {
            toast.success("Invitations sent successfully");
            setOpenBulkInvite(false);
            setFile(null);
        },
        () => toast.error("Upload failed")
    );

    const handleFile = (selectedFile) => {
        if (!selectedFile) return;

        const validTypes = [".xlsx", ".xls", ".csv"];

        const fileName = selectedFile.name.toLowerCase();

        const isValid = validTypes.some(ext => fileName.endsWith(ext));
        if (!isValid) {
            toast.error("Only Excel (.xlsx, .xls) or CSV files are allowed");
            return;
        }

        setFile(selectedFile);
    };

    const getFileIcon = (file) => {
        if (!file) return null;

        const name = file.name.toLowerCase();

        if (name.endsWith(".csv")) return csvIcon;
        if (name.endsWith(".xlsx") || name.endsWith(".xls")) return excelIcon;

        return null;
    };
    const exportColumns = [
        { label: 'Name', accessor: (i) => `${i?.firstName || ''} ${i?.lastName || ''}`.trim() },
        // { label: 'Name', accessor: (i) => `${i?.instructorProfile?.displayName || ''}`},
        {
            label: 'Teaches At', accessor: (i) => i?.instructorProfile?.teachesAt
            ?.map(t => t.studioName)
            .join(", ") || '-'
        },
        { label: 'Vibe Checks', accessor: (i) => i?.instructorProfile?.TotalVibeChecks || 0 },
        { label: 'Status', accessor: (i) => i?.instructorProfile?.approvalStatus || "-" },
    ];
    
    // const sortedData = [...(instructorData?.instructors || [])].sort((a, b) => {
    // const nameA = (a?.instructorProfile?.displayName || "").toLowerCase();
    // const nameB = (b?.instructorProfile?.displayName || "").toLowerCase();

    // return nameA.localeCompare(nameB);
    // });

    // const exportColumns = [
    //     {
    //         label: "Name",
    //         accessor: (i) => i?.instructorProfile?.displayName || "",
    //     },
    //     {
    //         label: "Teaches At",
    //         accessor: (i) =>
    //             i?.instructorProfile?.teachesAt
    //                 ?.map((t) => t.studioName)
    //                 .join(", ") || "-",
    //     },
    //     {
    //         label: "Vibe Checks",
    //         accessor: (i) => i?.instructorProfile?.TotalVibeChecks || 0,
    //     },
    //     {
    //         label: "Status",
    //         accessor: (i) => i?.instructorProfile?.approvalStatus || "-",
    //     },
    // ];
    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, lg: 3 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        List of Instructors
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 9 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
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
                        {/* <MenuItem value="">All</MenuItem> */}
                        {/* <MenuItem value={false}>Pending</MenuItem>
                        <MenuItem value={true}>Verified</MenuItem> */}
                        <MenuItem value={true}>Approve</MenuItem>
                        <MenuItem value={false}>Reject</MenuItem>
                    </TextField>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                        <Export
                            apiEndpoint="/admin/instructors"
                            columns={exportColumns}
                            fileName="instructors"
                            dataKey="instructors"
                        />

                        <Button
                            onClick={() => setOpenBulkInvite(true)}
                            component="label"
                            sx={{
                                height: "40px",
                                borderRadius: "8px",
                                backgroundColor: "var(--Blue)",
                                color: "white",
                                minWidth: "150px"
                            }}
                        >
                            Import Instructors
                        </Button>

                        <Button sx={{ width: '200px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--Blue)', color: 'white' }} onClick={() => nav('/home/instructors/add-instructor')}>
                            <AddIcon />
                            Add Instructor
                        </Button>
                    </Box>
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
                                                active={sortBy === 'displayName'}
                                                direction={sortOrder}
                                                onClick={() => changeSortOrder('displayName')}
                                                IconComponent={() => <img src={sortBy === 'displayName' ? sortOrder === 'asc' ? arrowup : arrowdown : arrownuteral} style={{ marginLeft: 5 }} />}
                                            >
                                                Name
                                            </TableSortLabel></TableCell>
                                        <TableCell sx={tableHeaderCellSx}>Teaches At</TableCell>

                                        <TableCell sx={{
                                            backgroundColor: '#F9FAFB',
                                            color: '#878787', textAlign: 'center'
                                        }}>
                                            <TableSortLabel
                                                active={sortBy === 'vibeChecks'}
                                                direction={sortOrder}
                                                onClick={() => changeSortOrder('vibeChecks')}
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
                                        const statusLabel = i?.instructorProfile?.approvalStatus === 'approved' ? "Approved" : "Rejected";
                                        const statusStyle = statusColorMap[statusLabel];

                                        return (
                                            <TableRow key={i.id}>
                                                <TableCell sx={{ fontWeight: 500 }}>
                                                    {i?.instructorProfile?.displayName}
                                                </TableCell>
                                                <TableCell sx={{ minWidth: 220 }}>
                                                    <Stack direction="row" spacing={1} display={"flex"}  sx={{ maxWidth: 350 }}>
                                                         {i?.instructorProfile?.teachesAt?.slice(0, 3).map((tag, index) => (
                                                            <Chip
                                                                key={index}
                                                                label={tag.studioName}
                                                                size="medium"
                                                                sx={{
                                                                    border: "1px solid #A855F7",
                                                                    color: "#A855F7",
                                                                    bgcolor: "transparent",
                                                                    fontWeight: 500,
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
                                                    <Stack direction="row" justifyContent={"center"} spacing={1}>
                                                        <Typography fontWeight={500} >
                                                            {i?.instructorProfile?.TotalVibeChecks || 0}
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

                                                <TableCell>
                                                    <Stack direction="row" justifyContent={"center"} spacing={1}>
                                                        {/* View Button */}
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
                        <ConfirmationPopUp
                            open={openPopup === "approve"}
                            onClose={handleClose}
                            onConfirm={handleConfirm}
                            title={"Approve Instructor"}
                            message={"Are you sure you want to approve this instructor?"}
                            BtnText={"Approve"}
                            BtnColor={"green"}
                            icon={<CheckIcon />}
                        />
                        <ConfirmationPopUp
                            open={openPopup === "reject"}
                            onClose={handleClose}
                            onConfirm={handleConfirm}
                            title={"Reject Instructor"}
                            message={"Are you sure you want to reject this instructor?"}
                            BtnText={"Reject"}
                            BtnColor={"green"}
                            icon={ClearIcon}
                        />
                    </>
                ) : (<Typography align="center" color="text.secondary" sx={{ mt: 1, pb: 2 }}>
                    No data found
                </Typography>)
            )}
            <Dialog open={openBulkInvite} onClose={() => setOpenBulkInvite(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Upload File</DialogTitle>

                <DialogContent>
                    {/* Drag & Drop Box */}
                    <Box
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                            e.preventDefault();
                            const droppedFile = e.dataTransfer.files[0];
                            handleFile(droppedFile);
                        }}
                        sx={{
                            border: "2px dashed #ccc",
                            borderRadius: "10px",
                            p: 4,
                            textAlign: "center",
                            cursor: "pointer",
                            mb: 2,
                            transition: "0.3s",
                            "&:hover": {
                                borderColor: "var(--Blue)",
                                backgroundColor: "#f9f9f9"
                            }
                        }}
                    >
                        <Typography fontWeight={500}>
                            Drag & Drop your file here
                        </Typography>

                        <Typography variant="body2" sx={{ my: 1 }}>
                            Supports .xlsx, .xls, .csv
                        </Typography>

                        <Typography variant="body2" sx={{ my: 1 }}>
                            or
                        </Typography>

                        {/* File Picker */}
                        <Button component="label" variant="outlined" sx={{ color: "var(--Blue)", border: "1px solid var(--Blue)" }}>
                            Browse File
                            <input
                                type="file"
                                hidden
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => handleFile(e.target.files[0])}
                            />
                        </Button>

                        {/* Selected file */}
                        {file && (
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 2,
                                    p: 1.5,
                                    border: "1px solid #eee",
                                    borderRadius: "8px",
                                    backgroundColor: "#fafafa"
                                }}
                            >
                                {/* File Icon */}
                                <Box
                                    component="img"
                                    src={getFileIcon(file)}
                                    sx={{ width: 40, height: 40 }}
                                />

                                {/* File Name */}
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {file.name}
                                </Typography>

                                {/* Remove Button (optional 🔥) */}
                                <Button
                                    size="small"
                                    onClick={() => setFile(null)}
                                    sx={{ ml: "auto", color: "red" }}
                                >
                                    Remove
                                </Button>
                            </Box>
                        )}
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* Download Sample */}
                        <Button
                            onClick={() => window.open("/Sample.csv")}
                            sx={{ textTransform: "none", color: "var(--Blue)" }}
                        >
                            Download Sample File
                        </Button>

                        {/* Upload */}
                        <Button
                            disabled={!file || isPending}
                            onClick={() => sendBulkInvite(file)}
                            sx={{
                                bgcolor: "var(--Blue)",
                                color: "white",
                                px: 3,
                                "&:hover": { bgcolor: "var(--Blue)" }
                            }}
                        >
                            {isPending ? "Uploading..." : "Upload"}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </Box >
    );
};

export default ListOfInstructor;
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};