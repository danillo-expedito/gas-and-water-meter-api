import IMeasure from "./IMeasure";

export default interface IMeasureModel {
  findAll(filter?: 'WATER' | 'GAS'): Promise<IMeasure[]>;
  findByUuid(uuid: string): Promise<IMeasure>;
  create(measure: IMeasure): Promise<IMeasure>;
  update(uuid: string, newValue: number): Promise<IMeasure>;
}