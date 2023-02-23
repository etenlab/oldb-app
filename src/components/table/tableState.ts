import {useEffect, useState} from "react";
import {ILoadData, PageParamType, useLoad} from "../../services/load-table";
import {GridColDef, GridValidRowModel} from "@mui/x-data-grid";
import {TablesMeta} from "../../common/DataTableObjects";
import {GridRowsProp} from "@mui/x-data-grid/models/gridRows";
import {useGetRowCount} from "./helpers";
import {GridCallbackDetails} from "@mui/x-data-grid/models/api";

const columnsPreparation = (tableName = 'glottolog-language'): GridColDef[] => {
    return TablesMeta[tableName].fields.map((value) => {
        return {
            ...value,
            width: 100
        }
    })
}

const useOnPageChange = (getData: ILoadData, setRows: React.Dispatch<React.SetStateAction<readonly GridValidRowModel[] | undefined>>): (page: number, details: GridCallbackDetails) => void => {
    return (page, details) => {
        getData({pageNumber: page, pageSize: 15})
            .then(data => {
                setRows(prevState => {
                    if (prevState) {
                        const newState =  [...prevState, ...data.rows]
                        return newState
                    } else {
                        console.log('prev')
                        return [...data.rows]
                    }
                })
            })
    }
}
export const useTable = (options: { tableName: string }) => {
    const [pageParams] = useState<PageParamType>({pageSize: 15, pageNumber: 0});
    const [rowCount, setRowCount] = useState(0)
    const [rows, setRows] = useState<GridRowsProp>()
    const getData = useLoad(pageParams, options.tableName)
    const getRowCount = useGetRowCount(options.tableName)
    const columns = columnsPreparation()
    const onPageChange = useOnPageChange(getData, setRows)
    useEffect(() => {
        getRowCount()
            .then(_rowCount => {
                setRowCount(_rowCount)
            })
        getData(pageParams).then(data => {
            setRows(data.rows)
        })
    }, [getData, getRowCount, pageParams])

    return {rows, rowCount, columns, onPageChange}
}
