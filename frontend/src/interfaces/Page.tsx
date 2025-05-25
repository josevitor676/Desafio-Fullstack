export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface Page<T> {
  data: T[];
  meta: Meta;
}