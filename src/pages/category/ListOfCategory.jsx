import React, { useState } from "react";
import {
    Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, Button, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField, Stack, Tooltip, Grid
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useGetCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '../../Api/Api'
import { useQueryClient } from "@tanstack/react-query";
import CustomPagination from "../../common/custom/CustomPagination";
import ConfirmationPopUp from '../../common/ConfirmationPopUp'
import DeleteConfirm from '../../assets/images/DeleteConfirm.svg'

const ListOfCategory = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [editCategory, setEditCategory] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedId, setSelectedId] = useState(null)
    const queryClient = useQueryClient();
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
        if (!editCategory?.name) {
            toast.error("Category name is required");
            return;
        }

        if (editCategory?.id) {
            updateMutation.mutate({
                id: editCategory.id,
                data: {
                    name: editCategory.name,
                    description: editCategory.description,
                },
            });
        } else {
            createMutation.mutate({
                name: editCategory.name,
                description: editCategory.description,
            });
        }
    };

    const handleDelete = () => {
        if (!selectedId) {
            return
        }
        deleteMutation.mutate(selectedId);
    };


    return (
        <Box sx={{ backgroundColor: "rgb(253, 253, 253)", boxShadow: "-3px 4px 23px rgba(0, 0, 0, 0.1)", mt: 2, padding: 0, borderRadius: '10px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ p: { xs: 3 } }}>
                <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', flexDirection: 'row', gap: 2, mb: { xs: 1, md: 0 } }}>
                    <Typography variant="h6" fontWeight={600}>
                        Vendor Categories
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }} sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
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
                                        <TableCell sx={tableHeaderCellSx}>Description</TableCell>
                                        {/* <TableCell sx={tableHeaderCellSx}>Status</TableCell> */}
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
                                                {/* <TableCell>
                                        <Chip
                                            label={cat.status}

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
                                    </TableCell> */}
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
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                BtnText="Delete Category"
            />
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