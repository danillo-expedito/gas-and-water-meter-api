import IMeasure from "./IMeasure";

export default interface IMeasureModel {
  findAll(filter?: 'WATER' | 'GAS'): Promise<IMeasure[]>;
  findByUuid(measure_uuid: string): Promise<IMeasure | null>;
  create(measure: IMeasure): Promise<IMeasure>;
  update(uuid: string, newValue: number): Promise<IMeasure | null>;
}