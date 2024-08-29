import IMeasure from './Measure/IMeasure';

export default interface IList {
  customer_code: string;
  measures: IMeasure[];
}