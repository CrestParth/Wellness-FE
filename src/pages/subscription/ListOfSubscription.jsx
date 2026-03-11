import React, { useState, useMemo } from "react";
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Grid,
    Chip,
    TextField,
    MenuItem,
} from "@mui/material";

const subscriptionData = [
    {
        id: 1,
        instructorName: "Michael Johnson",
        planName: "Premium Boost",
        platform: "Apple",
        amount: 49.99,
        recurring: true,
        status: "active",
        purchaseDate: "01/06/2025",
        expiryDate: "01/07/2025",
    },
    {
        id: 2,
        instructorName: "Sarah Yoga",
        planName: "Standard Boost",
        platform: "Google",
        amount: 29.99,
        recurring: false,
        status: "expired",
        purchaseDate: "18/05/2025",
        expiryDate: "18/06/2025",
    },
    {
        id: 3,
        instructorName: "David Wilson",
        planName: "Premium Boost",
        platform: "Apple",
        amount: 49.99,
        recurring: true,
        status: "active",
        purchaseDate: "10/06/2025",
        expiryDate: "10/07/2025",
    },
    {
        id: 4,
        instructorName: "Jessica Martinez",
        planName: "Standard Boost",
        platform: "Google",
        amount: 29.99,
        recurring: true,
        status: "active",
        purchaseDate: "05/06/2025",
        expiryDate: "05/07/2025",
    },
];

const ListOfSubscription = () => {
    const [platformFilter, setPlatformFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const filteredSubscriptions = subscriptionData.filter((s) => {
        const platformMatch = platformFilter ? s.platform === platformFilter : true;
        const statusMatch = statusFilter ? s.status === statusFilter : true;
        return platformMatch && statusMatch;
    });

    const totalRevenue = useMemo(() => {
        return filteredSubscriptions.reduce((sum, s) => sum + s.amount, 0);
    }, [filteredSubscriptions]);
    const statusColorMap = {
        active: {
            color: '#7BC8A9',
            border: '#10B981',
            bg: '#ECFDF5'
        },
        expired: {
            color: '#FF927C',
            border: '#EF4444',
            bg: '#FEF2F2'
        }
    };


    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        Subscriptions & Revenue
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <TextField
                        select
                        label="Status"
                        fullWidth
                        size="small"

                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
                    </TextField></Grid>
            </Grid>
            {/* Revenue Summary */}
            <Box
                sx={{
                    backgroundColor: "#F5F3FF",
                    p: 2,
                    mb: 0,
                    border: "1px solid #E9D5FF",
                }}
            >
                <Typography variant="body2" color="text.secondary"> Total Revenue </Typography> <Typography variant="h4" fontWeight={600} color="var(--Blue)"> ${totalRevenue.toFixed(2)} </Typography>
            </Box>

            {/* Subscription Table */}
            <TableContainer>
                <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={tableHeaderCellSx}>Instructor</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Amount</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Purchase Date</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Expiry Date</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filteredSubscriptions.length > 0 ? (
                            filteredSubscriptions.map((sub) => {
                                const statusStyle = statusColorMap[sub.status];
                                return (
                                    <TableRow key={sub.id}>
                                        <TableCell fontWeight={500}>
                                            {sub.instructorName}
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={sub.status}
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
                                        <TableCell>${sub.amount}</TableCell>
                                        <TableCell>{sub.purchaseDate}</TableCell>
                                        <TableCell>{sub.expiryDate}</TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">
                                    No subscriptions found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
};

export default ListOfSubscription;
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};