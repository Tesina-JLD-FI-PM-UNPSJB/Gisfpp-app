export interface PageResponse<T> {
  result?: T[],
  hasMoreElements?: boolean,
  numberPage?: number,
  sizePage?: number,
  totalElements?: number,
}
