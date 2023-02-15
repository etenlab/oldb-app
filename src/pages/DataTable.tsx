/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from '@emotion/react';
import { memo } from 'react';
// import { useParams, useHistory } from 'react-router';
// // import { TableLoader } from '@eten-lab/data-table';

// import { TablesMeta } from '../common/DataTableObjects';

// import { StyledH3, StyledWrapFullHeight } from '../common/styles';
// import { buildQuery } from '../common/query';
// import { useApolloClient } from '@apollo/client';
import { IonContent } from '@ionic/react';

// import { toCamelCase } from '../common/utils';

// interface PageParamType{
//   pageSize?: number;
//   pageNumber?: number;
//   search?: string;
// }

const DataTable: React.FC = () => {

    // type ObjectKey = keyof typeof TablesMeta;
    // const client = useApolloClient();
    // const [pageParams, setPageParams] = useState<PageParamType>(); 
    // let { table } = useParams<{ table: string }>();
    // const history = useHistory();

    // let tableName = toCamelCase(table); // table.toString().replaceAll('-', '_');
    // const tName: ObjectKey = table;
    // let listingName = TablesMeta[tName].listing?TablesMeta[tName].listing:toCamelCase(table);
    // let tableFields = TablesMeta[tName].fields.map((value) => value.field);

    // const buildQueryFromParams = (query: PageParamType) => {
    //     var gqlQuery = buildQuery({
    //       tableName: tableName,
    //       listingName: listingName,
    //       aggregateTable: tableName,
    //       fields: { [tableName]: tableFields },
    //       filterColumns: TablesMeta[tName].searchFields,
    //       filterValue: (query?query.search:"") + '%',
    //       getRow: false,
    //       limit: (query?query.pageSize:25),
    //       // offset: query.pageNumber! * query.pageSize!,
    //     });
    //     return gqlQuery;
    //   };
    
    //   const doQuery = async (params: PageParamType) => {
    //     setPageParams(params);
    //     return loadData();
    //   };

    //   const loadData = useCallback(async () => {
    //     const query = buildQueryFromParams(pageParams!);
    //     console.log(listingName);
    //     const response = await client.query({ query });
    //     console.log(response.data[tableName + 'Aggregate'][0].count.id);
    //     let totalCount = response.data[tableName + 'Aggregate'][0].count.id; // response.data[tableName + 'Aggregate'].aggregate.count;
    //     console.log(response.data);
    //     let rows: any[] = [];
    //     for(var edge of response.data[listingName!].edges){
    //       rows.push(edge.node);
    //     }
    //     //let rows = response.data[tableName].edge.node;
    //     return { totalCount, rows };
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   }, [pageParams, listingName])
    
    //   const handleRowClick = ({ rowData, rowIndex }: { rowData: unknown, rowIndex: number }) => {
    //     history.push(`/discussion/${table}/${rowIndex}`);
    //   }

      return (
        <IonContent>
          {/* <StyledWrapFullHeight>
            <StyledH3>{TablesMeta[tName].title}</StyledH3>
            <TableLoader
              columns={TablesMeta[tName].fields}
              doQuery={doQuery}
              eager
              loadPageSize={25}
              onRowClicked={handleRowClick}
            ></TableLoader>
          </StyledWrapFullHeight> */}
        </IonContent>
      );
}

export default memo(DataTable);