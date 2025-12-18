import React, { useState } from "react";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Stack, Chip, Tooltip, Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

const initialCategories = [
    {
        id: 1,
        name: "Gym",
        description: "Strength training and gym-based workouts",
        status: "active",
    },
    {
        id: 2,
        name: "Yoga",
        description: "Yoga and flexibility-focused practices",
        status: "active",
    },
    {
        id: 3,
        name: "Meditation Center",
        description: "Mindfulness and meditation programs",
        status: "active",
    },
    {
        id: 4,
        name: "Fitness Center",
        description: "General fitness and wellness facilities",
        status: "suspended",
    },
];

const ListOfCategory = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [openDialog, setOpenDialog] = useState(false);
    const [editCategory, setEditCategory] = useState(null);

    const handleOpenAdd = () => {
        setEditCategory(null);
        setOpenDialog(true);
    };

    const handleOpenEdit = (category) => {
        setEditCategory(category);
        setOpenDialog(true);
    };

    const handleClose = () => {
        setEditCategory(null);
        setOpenDialog(false);
    };

    const handleSave = () => {
        if (editCategory?.id) {
            setCategories((prev) =>
                prev.map((c) => (c.id === editCategory.id ? editCategory : c))
            );
            toast.success("Category updated successfully");
        } else {
            setCategories((prev) => [
                ...prev,
                {
                    ...editCategory,
                    id: Date.now(),
                    status: "active",
                },
            ]);
            toast.success("Category added successfully");
        }
        handleClose();
    };

    const handleDelete = (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("Category deleted successfully");
    };
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
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        Vendor Categories
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 8 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{ color: 'white', borderRadius: '8px', backgroundColor: 'var(--Blue)', height: '40px' }}
                        startIcon={<AddIcon sx={{ color: 'white' }} />}
                        onClick={handleOpenAdd}
                    >
                        Add Category
                    </Button>
                </Grid>
            </Grid>

            <TableContainer>
                <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell sx={tableHeaderCellSx}>Category Name</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Description</TableCell>
                            <TableCell sx={tableHeaderCellSx}>Status</TableCell>
                            <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {categories.map((cat) => {
                            const statusStyle = statusColorMap[cat.status];
                            return (
                                <TableRow key={cat.id}>
                                    <TableCell fontWeight={500}>{cat.name}</TableCell>
                                    <TableCell>{cat.description}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={cat.status}

                                            sx={{
                                                backgroundColor: 'white',
                                                color: statusStyle.color,
                                                border: `1px solid ${statusStyle.border}`,
                                                '& .MuiChip-label': {
                                                    textTransform: 'capitalize',
                                                    fontWeight: 500,
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Edit Category">
                                            <IconButton onClick={() => handleOpenEdit(cat)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete Category">
                                            <IconButton
                                                color="error"
                                                onClick={() => handleDelete(cat.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Add / Edit Dialog */}
            <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    {editCategory ? "Edit Category" : "Add Category"}
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Category Name"
                            value={editCategory?.name || ""}
                            onChange={(e) =>
                                setEditCategory((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            fullWidth
                        />
                        <TextField
                            label="Description"
                            value={editCategory?.description || ""}
                            onChange={(e) =>
                                setEditCategory((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'black' }}>Cancel</Button>
                    <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: 'var(--Blue)', color: 'white' }}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ListOfCategory;
const tableHeaderCellSx = {
    backgroundColor: '#F9FAFB',
    color: '#878787'
};