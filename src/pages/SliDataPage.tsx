import { TableLoader } from '@eten-lab/data-table'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonRouter } from '@ionic/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { StyledWrapFullHeight, StyledH3 } from '../common/styles'
import { DataTableDto } from '../dtos/airtable.dto'

const API_REQ_PAGE_SIZE = 25

const SliDataPage: React.FC = () => {
    const router = useIonRouter()

    const [dataTable, setDataTable] = useState<DataTableDto>({
        tableInfo: { title: 'Data Table', totalRows: 0 },
        rows: [],
        headers: [],
    })

    const doQuery = useCallback(
        async (params: { pageSize: number; pageNumber: number; search: string }) => {
            const query = {
                pageSize: params.pageSize,
                offset: params.pageNumber * params.pageSize,
            }
            const apiRes = await axios.post<DataTableDto>(`${process.env.REACT_APP_OLDB_API}airtable/search`, query)

            if ([200, 201].includes(apiRes.status) && apiRes.data && apiRes.data.rows?.length) {
                const totalCount = apiRes.data.tableInfo?.totalRows || 0
                const rows = apiRes.data.rows
                setDataTable(apiRes.data)
                return { totalCount, rows }
            }

            throw new Error(`No data returned from oldbApi / Airtable`)
        },
        [setDataTable],
    )

    const handleRowClick = ({ rowData, rowIndex }: { rowData: unknown; rowIndex: number }) => {
        router.push('/')
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            router.push('/home')
                        }}
                    >
                        openlanguages.io
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <StyledWrapFullHeight>
                    <StyledH3>{dataTable.tableInfo.title}</StyledH3>
                    <TableLoader
                        columns={dataTable.headers}
                        doQuery={doQuery}
                        loadPageSize={API_REQ_PAGE_SIZE}
                        onRowClicked={handleRowClick}
                    ></TableLoader>
                </StyledWrapFullHeight>
            </IonContent>
        </IonPage>
    )
}

export default SliDataPage
