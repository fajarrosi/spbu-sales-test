export interface SuccessResponseTable {
  code:     number;
  status:   string;
  data:     [];
  meta:     Meta;
  trace_id: string;
}

export interface Meta {
  limit:      number;
  page:       number;
  total_data: number;
  total_page: number;
}