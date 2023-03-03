export interface TableInfoDto {
  id?: string | number;
  title: string;
  totalRows: number;
}
export interface TblHeaderDto {
  field: string;
  title: string;
}
export interface TblRowDto {
  id: string | number;
  [key: string]: string | number | boolean;
}
export interface DataTableDto {
  tableInfo: TableInfoDto;
  headers: TblHeaderDto[];
  rows: TblRowDto[];
}
