declare type ServiceResponse<T> = {
  data: T;
};

declare type ServiceErrorResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
};

declare type ServicePagination = {
  page: number;
  limit: number;
  total: number;
};

declare type ServiceResponseWithPagination<T> = {
  data: {
    rows: T[];
    pagination: ServicePagination;
  };
};

