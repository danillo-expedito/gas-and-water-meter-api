export default interface IHandleResponse<T> {
  status: 'SUCCESSFUL' | 'ERROR';
  data?: T;
  error_code?: string;
  error_description?: string;
}