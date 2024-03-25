declare type ServiceResponse<T> = {
  data: T;
};

declare type ServiceErrorResponse = {
  message: string | string[];
  error: string;
  statusCode: number;
};

