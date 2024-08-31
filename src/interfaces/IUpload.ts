type Base64 = string;
type DateTime = Date;

export default interface IUpload {
  image: Base64;
  customer_code: string;
  measure_datetime: DateTime;
  measure_type: 'WATER' | 'GAS'
}