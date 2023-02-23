import {useCallback} from "react";
import {gql, useApolloClient} from "@apollo/client";

export interface PageParamType {
    pageSize: number;
    pageNumber: number;
    search?: string;
}


// (pageParams: uploadInterface, tableName: string) => Promise<{totalCount: any, rows: any}>
export type ILoadData = (pageParams: PageParamType) => Promise<{ totalCount: any, rows: any }>
export const useLoad = (pageParams: PageParamType, tableName: string) => {
    const client = useApolloClient()

    return useCallback(async (pageParams: PageParamType) => {
        const offset = pageParams.pageNumber! * pageParams.pageSize!
        const limit = pageParams.pageSize
        console.log(pageParams)
        console.log(`offset: ${offset}`)
        console.log(`limit: ${limit}`)
        const sq = gql`{
            glottolog_language_aggregate(limit: ${limit}, offset: ${offset}, where: {}) {
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
        let rows = response.data[tableName].nodes;
        return {totalCount, rows};
    }, [pageParams, tableName, client])
}
