import { gql } from '@apollo/client';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';

interface tableFields {
    [key: string]: string[];
  }
  interface rowFields {
    [key: string]: string;
  }
  
  export interface RequestArgs {
    tableNames?: string[];
    tableName?: string;
    listingName?:string;
    aggregateTable?: string;
    fields: tableFields;
    limit?: number;
    offset?: number;
    filterValue?: string;
    filterColumns?: string[];
    getRow?: boolean;
    getRowField?: rowFields;
    getRowValue?: string;
  }
  
  export function buildQuery(request: RequestArgs){
    var query = `{"query":{`;
    if (!request.getRow) {
      if (request.aggregateTable) {
        query += `"${request.aggregateTable}Aggregate":{`;
        if (request.filterValue !== '' && request.filterColumns!.length > 0){
          query += `"__args":{"filter":{"or":[`;
          request.filterColumns!.forEach((fc, index) => {
            if (index > 0) {
              query += `,`;
            }
            query += `{"${fc}":{"iLike": "${request.filterValue}"}}`;
          });
          query += `]}},`;
        }
        query += `"count":{"id":"true"}},`;
      }
    }
    if (request.listingName){
      query += `"${request.listingName}":{`;
        if (request.getRow && request.getRowField![request.tableName!]) {
          query += `"__args":{"filter":{"${
            request.getRowField![request.tableName!]
          }":{"eq":"${request.getRowValue}"}}},`;
        } else {
          query += `"__args":{"paging":{"first": ${request.limit}},"filter":{"or":[`;
          request.filterColumns!.forEach((fc, index) => {
            if (index > 0) {
              query += `,`;
            }
            query += `{"${fc}":{"iLike":"${request.filterValue}"}}`;
          });
          query += `]}},`;
        }
        query += `"pageInfo": {
          "startCursor": "true",
          "endCursor":"true"
        },
        "edges": {
          "cursor": "true",
          "node": {`;

        
        if (request.fields[request.tableName!].length) {
          request.fields[request.tableName!].forEach((column, index) => {
            if (index > 0) {
              query += `, `;
            }
            query += `"${column}":"true"`;
          });
        }
        query += `}
        }`;
        query += `}`;
    }
    if (request.tableNames?.length) {
      request.tableNames.forEach((tableName, tblIndex) => {
        if (tblIndex > 0) {
          query += `,`;
        }
        query += `"${tableName}":{`;
        if (request.getRow && request.getRowField![tableName]) {
          query += `"__args":{"filter":{"${
            request.getRowField![tableName]
          }":{"eq":"${request.getRowValue}"}}},`;
        } else {
          query += `"__args":{"paging":{"first": ${request.limit}},"offset":${request.offset},"filter":{"or":[`;
          request.filterColumns!.forEach((fc, index) => {
            if (index > 0) {
              query += `,`;
            }
            query += `{"${fc}":{"iLike":"${request.filterValue}"}}`;
          });
          query += `]}},`;
        }
        if (request.fields[tableName].length) {
          request.fields[tableName].forEach((column, index) => {
            if (index > 0) {
              query += `, `;
            }
            query += `"${column}":"true"`;
          });
        }
        query += `}`;
      });
    }
    query += `}}`;
    // console.log(query);
    let jsonObject = JSON.parse(query);
    // console.log(jsonObject);
    var gqlQuery = jsonToGraphQLQuery(jsonObject, { pretty: true });
    return gql`
      ${gqlQuery}
    `;
  }
  