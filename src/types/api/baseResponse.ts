export interface BaseResponse<TData> {
  data: TData;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface PaginationMeta {
  pagination: Pagination;
}

export interface PaginatedResponse<TData> extends BaseResponse<TData> {
  meta: PaginationMeta;
}
