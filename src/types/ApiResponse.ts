export interface ApiResponse<T> {
    data: T;
    code: number;
    status: string;
  }
  