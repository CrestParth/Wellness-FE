import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import excelIcon from "../assets/images/excelIcon.svg";
import { toast } from "react-toastify";
import apiClient from "../Api/ApiClient";

const Export = ({
    fileName = "data",
    columns = [],
    apiEndpoint,
    params = {},
    dataKey = "data"
}) => {
    const [loading, setLoading] = useState(false);

    const exportToExcel = async () => {
        try {
            setLoading(true);

            const { data } = await apiClient.get(apiEndpoint, {
                params: {
                    page: 1,
                    limit: 10000,
                    ...params
                },
            });

            const list = data?.data?.[dataKey] || [];

            if (!list.length) {
                toast.error("No data available to export");
                return;
            }
            const formattedData = list.map((item) => {
                const row = {};
                columns.forEach((col) => {
                    row[col.label] =
                        typeof col.accessor === "function"
                            ? col.accessor(item)
                            : item[col.accessor] ?? "-";
                });
                return row;
            });
            const worksheet = XLSX.utils.json_to_sheet(formattedData);
            const workbook = XLSX.utils.book_new();

            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

            const buffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "array",
            });

            const blob = new Blob([buffer], {
                type: "application/octet-stream",
            });

            saveAs(blob, `${fileName}.xlsx`);

            toast.success("Excel file exported successfully");

        } catch (error) {
            console.error(error);
            toast.error("Failed to export Excel");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            startIcon={!loading && <img src={excelIcon} alt="export icon" />}
            variant="outlined"
            size="small"
            onClick={exportToExcel}
            disabled={loading}
            sx={{
                height: "40px",
                color: "black",
                border: "1px solid #AFB3BD",
                minWidth: "150px",
                borderRadius: "8px",
                display: "flex",
                gap: 1
            }}
        >
            {loading ? (
                <CircularProgress size={20} sx={{ color: "var(--Blue)" }} />
            ) : (
                "Export Excel"
            )}
        </Button>
    );
};

export default Export;