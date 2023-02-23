import {IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar, useIonRouter} from "@ionic/react";
import React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@mui/x-data-grid";
import DataTable from "./DataTable";
import {GridTable} from "../components/table/GridTable";

const SliDataPage: React.FC = () => {
    const router = useIonRouter();

    const rows = [
        {id: 1, ietf: "Snow", firstName: "Jon", country: "ua"},
        {id: 2, ietf: "Lannister", firstName: "Cersei", country: "en"},
        {id: 3, ietf: "Lannister", firstName: "Jaime", country: "pl"},
        {id: 4, ietf: "Stark", firstName: "Arya", country: "sl"},
        {id: 5, ietf: "Targaryen", firstName: "Daenerys", country: "at"},
        {id: 6, ietf: "Melisandre", firstName: null, country: "cz"},
        {id: 7, ietf: "Clifford", firstName: "Ferrara", country: "ca"},
        {id: 8, ietf: "Frances", firstName: "Rossini", country: "au"},
        {id: 9, ietf: "Roxie", firstName: "Harvey", country: "bg"},
        {id: 10, ietf: "Roxie", firstName: "Harvey", country: "bg"},
        {id: 11, ietf: "Roxie", firstName: "Harvey", country: "bg"},
        {id: 12, ietf: "Roxie", firstName: "Harvey", country: "bg"},
    ];

    const columns: GridColDef[] = [
        {field: "iso", headerName: "iso", width: 100},
        {field: "ietf", headerName: "ietf", width: 130},
        {field: "lang name", headerName: "lang name", width: 140},
        {
            field: "country",
            headerName: "country",
            width: 120,
        },
        {
            field: "liPop",
            headerName: "liPop",
            description: "This column has a value getter and is not sortable.",
            sortable: false,
            width: 150,
            valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ""} ${params.row.lastName || ""}`,
        },
        {
            field: "field",
            headerName: "field",
            width: 100,
        },
        {
            field: "entries",
            headerName: "entries",
            width: 120,
        },
    ];

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            router.push("/home");
                        }}
                    >
                        openlanguages.io
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large"></IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonText>SLI Data</IonText>
                <IonContent style={{height: "88vh", width: "95vw", marginLeft: 40}}>
                    <GridTable/>
                    {/*<DataGrid*/}
                    {/*  sx={{*/}
                    {/*    color: "#fff",*/}
                    {/*    "& .MuiDataGrid-cell:hover": {*/}
                    {/*      color: "primary.main",*/}
                    {/*      cursor: "pointer",*/}
                    {/*    },*/}
                    {/*    "& .MuiDataGrid-columnHeader:hover": {*/}
                    {/*      color: "#9e9e9e",*/}
                    {/*      cursor: "pointer",*/}
                    {/*    },*/}
                    {/*    "& .MuiButtonBase-root": {*/}
                    {/*      color: "#fff",*/}
                    {/*    },*/}
                    {/*    "& .MuiTablePagination-root": {*/}
                    {/*      color: "#fff",*/}
                    {/*    },*/}
                    {/*  }}*/}
                    {/*  rows={rows}*/}
                    {/*  columns={columns}*/}
                    {/*  pageSize={15}*/}
                    {/*  rowsPerPageOptions={[15]}*/}
                    {/*  checkboxSelection*/}
                    {/*/>*/}
                    {/*<DataTable/>*/}
                </IonContent>
            </IonContent>
        </IonPage>
    );
};

export default SliDataPage;
