/**
 * Model for a query from the API.
 */
export interface QueryInterface<T> {
  page: number,
  results: T[],
  total_pages: number,
  total_results: number
}
