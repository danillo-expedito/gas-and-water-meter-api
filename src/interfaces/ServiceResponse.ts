export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'INVALID_TYPE' | 'INVALID_DATA' |
 'MEASURES_NOT_FOUND' | 'MEASURE_NOT_FOUND' | 'CONFIRMATION_DUPLICATE' |
 'DOUBLE_REPORT';

export type ServiceResponseError = {
  status: 'ERROR',
  error_code: ServiceResponseErrorType;
  error_description: string;
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL',
  data?: T
};

export type ServiceResponse<T> = ServiceResponseSuccess<T> | ServiceResponseError;