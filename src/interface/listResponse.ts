export type ListResponse<T> = {
  data: Array<T>;
  paging: {
    total_record: number;
    page_current: number;
    page_limit: number;
    page_total: number;
  };
};

export type DetailResponse<T> = {
  data: T;
  paging: {
    total_record: number;
    page_current: number;
    page_limit: number;
    page_total: number;
  };
};
