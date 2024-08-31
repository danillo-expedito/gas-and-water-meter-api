export default interface IMeasure {
  measureUuid: string;
  measureDatetime: Date;
  measureType: string;
  measureValue: number;
  hasConfirmed: boolean;
  imageUrl: string;
  customerCode: string;
}