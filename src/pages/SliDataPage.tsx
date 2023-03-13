import { TableLoader } from "@eten-lab/data-table";
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from "@ionic/react";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { StyledWrapFullHeight, StyledH3 } from "../common/styles";
import { DataTableDto } from "../dtos/airtable.dto";
import { PageParamType } from "../services/load-table";

const SliDataPage: React.FC = () => {
    const router = useIonRouter();
    const [pageParams, setPageParams] = useState<PageParamType>({pageNumber: 0, pageSize: 25});
    const [dataTable, setDataTable] = useState<DataTableDto>({ tableInfo: { title: 'Data Table', totalRows: 0 }, rows: [], headers: [] });

    const fetchData = async (params:PageParamType) => {
        let totalCount = dataTable.tableInfo.totalRows
        let rows = dataTable.rows
        try {
            const apiEndpoint = `${process.env.REACT_APP_OLDB_API}airtable/search`;
            const query = {pageSize: params?.pageSize, offset: ((params?.pageNumber || 0) * (params?.pageSize || 0))}
            const apiRes = (await axios.post<DataTableDto>(apiEndpoint, query))
            if ([200, 201].includes(apiRes.status) && apiRes.data) {
                setDataTable(apiRes.data)
                totalCount = apiRes.data.tableInfo?.totalRows || 0
                rows = apiRes.data.rows
            }
        } catch (error) {
            console.error('failed to fetch table data::', error)
        }
        return { totalCount, rows }
    }

    const doQuery = async (params: PageParamType): Promise<{
        totalCount: number | null;
        rows: any[];
    }> => {
        setPageParams(params);
        const res = await fetchData(params);
        return res
    };

    const fetchDataCallback = useCallback(doQuery, [dataTable.rows, dataTable.tableInfo.totalRows, pageParams?.pageNumber, pageParams?.pageSize])
    

    const handleRowClick = ({ rowData, rowIndex }: { rowData: unknown, rowIndex: number }) => {
        router.push('/')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            router.push("/home");
                        }}
                    >
                        openlanguages.io
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            {/* <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonText>SLI Data</IonText>
                <IonContent style={{height: "88vh", width: "95vw", marginLeft: 40}}>
                    <GridTable/>
                </IonContent>
            </IonContent> */}
            <IonContent>
                <StyledWrapFullHeight>
                    <StyledH3>{dataTable.tableInfo.title}</StyledH3>
                    <TableLoader
                        columns={dataTable.headers}
                        doQuery={fetchDataCallback}
                        loadPageSize={pageParams?.pageSize}
                        onRowClicked={handleRowClick}
                    ></TableLoader>
                </StyledWrapFullHeight>
            </IonContent>
        </IonPage>
    );
};

export default SliDataPage;
