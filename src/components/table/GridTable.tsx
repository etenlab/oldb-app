import React from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {useTable} from "./tableState";


export const GridTable = () => {
    const tableName = 'glottolog_language_aggregate'
    const {rows, columns,rowCount, onPageChange} = useTable({tableName})

    return (
        <>
            {rows && <DataGrid
                sx={{
                    color: "#fff",
                    "& .MuiDataGrid-cell:hover": {
                        color: "primary.main",
                        cursor: "pointer",
                    },
                    "& .MuiDataGrid-columnHeader:hover": {
                        color: "#9e9e9e",
                        cursor: "pointer",
                    },
                    "& .MuiButtonBase-root": {
                        color: "#fff",
                    },
                    "& .MuiTablePagination-root": {
                        color: "#fff",
                    },
                }}
                rows={rows}
                columns={columns}
                rowCount={rowCount}
                pageSize={15}
                onPageChange={onPageChange}
                // rowsPerPageOptions={[15]}
                checkboxSelection
            />}
        </>
    );
};
