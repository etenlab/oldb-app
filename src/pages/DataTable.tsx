import React, {memo, useCallback, useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {TableLoader} from '@eten-lab/data-table';

import {TablesMeta} from '../common/DataTableObjects';

import {StyledH3, StyledWrapFullHeight} from '../common/styles';
import {gql, useApolloClient} from '@apollo/client';
import {IonContent} from '@ionic/react';

import {toCamelCase} from '../common/utils';

interface PageParamType {
    pageSize?: number;
    pageNumber?: number;
    search?: string;
}

const DataTable: React.FC = () => {

    type ObjectKey = keyof typeof TablesMeta;
    const client = useApolloClient();
    const [pageParams, setPageParams] = useState<PageParamType>();
    // let {table} = useParams<{ table: string }>();
    const table = 'glottolog-language'
    const history = useHistory();

    // let tableName = toCamelCase(table); // table.toString().replaceAll('-', '_');
    const tableName = 'glottolog_language_aggregate'
    const tName: ObjectKey = table;
    let listingName = TablesMeta[tName].listing ? TablesMeta[tName].listing : toCamelCase(table);
    let tableFields = TablesMeta[tName].fields.map((value) => value.field);

    // const buildQueryFromParams = (query: PageParamType) => {
    //     console.log(query)
    //     console.log(tableName)
    //     var gqlQuery = buildQuery({
    //         tableName: tableName,
    //         listingName: listingName,
    //         aggregateTable: tableName,
    //         fields: {[tableName]: tableFields},
    //         filterColumns: TablesMeta[tName].searchFields,
    //         filterValue: (query ? query.search : "") + '%',
    //         getRow: false,
    //         // limit: 25,
    //         // offset: 0,
    //         limit: (query ? query.pageSize : 25),
    //         offset: query ? (query.pageNumber! * query.pageSize!) : 0,
    //         //  offset: query.pageNumber! * query.pageSize!,

    //     });
    //     console.log(gqlQuery)
    //     return gqlQuery;
    // };

    const doQuery = async (params: PageParamType): Promise<{
        totalCount: number | null;
        rows: any[];
    }> => {
        setPageParams(params);
        const data = loadData();
        return data
    };

    const loadData = useCallback(async () => {
        // const query = buildQueryFromParams(pageParams!);

        const sq = gql`{
  glottolog_language_aggregate(limit: ${(pageParams ? pageParams.pageSize : 100)}, offset: ${pageParams ? (pageParams.pageNumber! * pageParams.pageSize!) : 0}, where: {}) {
    aggregate {
      count
    }
    nodes {
      child_dialects
      glottocode
      id
      iso_639_3
      latitude
      longitude
      macro_area
      name
      top_level_family
    }
  }
}

`
        const response = await client.query({query: sq});

        let totalCount = response.data[tableName].aggregate.count;
        // console.log(totalCount)
        // let rows: any[] = [];
        // for (var edge of response.data[listingName!].edges) {
        //     rows.push(edge.node);
        // }
        let rows = response.data[tableName].nodes;

        return {totalCount, rows};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageParams, listingName])

    const handleRowClick = ({rowData, rowIndex}: { rowData: unknown, rowIndex: number }) => {
        history.push(`/discussion/${table}/${rowIndex}`);
    }

    return (
        <IonContent>
            <StyledWrapFullHeight>

                <StyledH3>{TablesMeta[tName].title}</StyledH3>
                <TableLoader

                    columns={TablesMeta[tName].fields}
                    doQuery={doQuery}
                    // eager
                    loadPageSize={25}
                    onRowClicked={handleRowClick}
                ></TableLoader>
            </StyledWrapFullHeight>
        </IonContent>
    );
}


export default memo(DataTable);
