export default interface IMeasure {
  measure_uuid: string;
  measure_datetime: string;
  measure_type: string;
  measure_value: number;
  has_confirmed: boolean;
  image_url: string;
  customer_code: string;
}