export interface IMeasureListResponse {
  measure_uuid: string;
  measure_datetime: Date;
  measure_type: string;
  has_confirmed: boolean;
  image_url: string;
}

export default interface IList {
  customer_code: string;
  measures: IMeasureListResponse[];
}
