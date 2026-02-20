import React, { useState } from "react";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Stack, Tooltip, Grid, TableSortLabel
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmationPopUp from "../../common/ConfirmationPopUp";
import DeleteConfirm from '../../assets/images/deleteIcon.svg'
import { toast } from "react-toastify";
import { useGetCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '../../Api/Api'
import { useQueryClient } from "@tanstack/react-query";
import CustomPagination from "../../common/custom/CustomPagination";
import arrowup from '../../assets/images/arrowup.svg';
import arrowdown from '../../assets/images/arrowdown.svg';
import arrownuteral from '../../assets/images/arrownuteral.svg';

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
    const [openDialog, setOpenDialog] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const queryClient = useQueryClient();
    const [openPopup, setOpenPopup] = useState(null);
    const [sortBy, setSortBy] = useState("firstName");
    const [sortOrder, setSortOrder] = useState("asc");

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
        setOpenPopup(null)
    };

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


    const { data, isLoading } = useGetCategories(currentPage, rowsPerPage);
    const categories = data?.data?.categories || [];

    const totalUsers = data?.data?.pagination?.total;
    const totalPages = Math.ceil(totalUsers / rowsPerPage);

    const createMutation = useCreateCategory(
        () => {
            toast.success("Category created successfully");
            queryClient.invalidateQueries(["categories"]);
            handleClose();
        },
        (error) => toast.error(error?.message || "Error creating category")
    );

    const updateMutation = useUpdateCategory(
        () => {
            toast.success("Category updated successfully");
            queryClient.invalidateQueries(["categories"]);
            handleClose();
        },
        (error) => toast.error(error?.message || "Error updating category")
    );

    const deleteMutation = useDeleteCategory(
        () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries(["categories"]);
            setOpenDelete(false)
        },
        (error) => toast.error(error?.message || "Error deleting category")
    );

    const handleSave = () => {
        if (!editCategory?.name?.trim()) {
            toast.error("Category name is required");
            return;
        }
        const payload = {
            name: editCategory.name.trim(),
            description: editCategory.description?.trim() || ""
        };

        if (editCategory.id) {
            updateMutation.mutate({
                id: editCategory.id,
                data: payload
            });
        } else {
            createMutation.mutate(payload);
        }

    };

    const handleDelete = () => {
        if (!selectedId) return;
        deleteMutation.mutate(selectedId);
    };



    const handleOpen = (type) => setOpenPopup(type);

    const handleConfirm = () => {
        if (openPopup === "delete") {
            toast.success('Deleted Successfully')
        }
        handleClose()
    }
    const changeSortOrder = (e) => {
        const field = e.target.id;

        if (field !== sortBy) {
            setSortBy(field);
            setSortOrder("asc");
        } else {
            setSortOrder(p => p === 'asc' ? 'desc' : 'asc')
        }
    }

    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        Class Style Listing
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{ color: 'white', borderRadius: '8px', backgroundColor: 'var(--Blue)', height: '40px' }}
                        startIcon={<AddIcon sx={{ color: 'white' }} />}
                        onClick={handleOpenAdd}
                    >
                        Add Class Style
                    </Button>
                </Grid>
            </Grid>

            {isLoading ? (
                <Typography sx={{ p: 3 }}>Loading categories...</Typography>
            ) :
                Array.isArray(data?.data?.categories) && data?.data?.categories?.length > 0 ? (
                    <>
                        <TableContainer>
                            <Table sx={{ '& .MuiTableCell-root': { fontSize: '15px' } }}>
                                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow>
                                        <TableCell sx={tableHeaderCellSx}>Category Name</TableCell>

                                        <TableCell align="center" sx={tableHeaderCellSx}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {categories.map((cat) => {
                                        const statusStyle = statusColorMap[cat.status];
                                        return (
                                            <TableRow key={cat.id}>
                                                <TableCell fontWeight={500}>{cat.name}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Edit Category">
                                                        <IconButton onClick={() => handleOpenEdit(cat)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete Category">
                                                        <IconButton
                                                            color="error"
                                                            onClick={() => {
                                                                setOpenDelete(true)
                                                                setSelectedId(cat.id)
                                                            }}
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

                        <CustomPagination totalPages={totalPages} setCurrentPage={setCurrentPage} setRowsPerPage={setRowsPerPage} rowsPerPage={rowsPerPage} currentPage={currentPage} />
                    </>
                ) : (
                    <Typography align="center" color="text.secondary" sx={{ mt: 2, p: 2 }}>
                        No data found
                    </Typography>
                )}
            <ConfirmationPopUp
                open={openDelete}
                icon={DeleteConfirm}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleDelete}
                title="Delete Class Style"
                message="Are you sure you want to delete this class style? This action cannot be undone."
                BtnText="Delete Class Style"
            />
            {/* Add / Edit Dialog */}
            <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    {editCategory ? "Edit Class Style" : "Add Class Style"}
                </DialogTitle>

                <DialogContent>
                    <Stack spacing={2} mt={1}>
                        <TextField
                            label="Class Style Name"
                            value={editCategory?.name || ""}
                            onChange={(e) =>
                                setEditCategory((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            fullWidth
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: 'black' }}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={createMutation.isPending || updateMutation.isPending}
                        sx={{ backgroundColor: 'var(--Blue)', color: 'white' }}
                    >
                        {(createMutation.isPending || updateMutation.isPending)
                            ? "Saving..."
                            : "Save"}
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