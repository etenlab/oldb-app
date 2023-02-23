import {gql, useApolloClient} from "@apollo/client";
import {useCallback} from "react";

const localQueryBuilder = (tableName: string) => {
    return gql` {
  ${tableName} {
    aggregate {
      count
    }
  }
}
`
}

export const useGetRowCount = (tableName: string) => {
    const client = useApolloClient()
    const query = localQueryBuilder(tableName)
    return useCallback(async () => {
        const response = await client.query({query});
        return response.data[tableName].aggregate.count
    }, [tableName, client, query])
}
