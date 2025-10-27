/**
 * Standard API Response Interface
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  timestamp?: string;
}

/**
 * Paginated Response Interface
 */
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

/**
 * API Error Response Interface
 */
export interface ApiErrorResponse {
  status: number;
  statusText: string;
  message: string;
  errors?: string[];
}

