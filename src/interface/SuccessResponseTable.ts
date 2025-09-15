import { PaginationTable } from './PaginationTable'

export interface SuccessResponseTable {
  message:    string;
  data: [];
  paging:     PaginationTable;
  request_id: string;
}