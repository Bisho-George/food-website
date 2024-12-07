
export interface IResponse<T> {
  data: T[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
  pageSize: number;
  pageNumber: number
}
