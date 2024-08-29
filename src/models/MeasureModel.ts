import IMeasure from "../interfaces/Measure/IMeasure";
import IMeasureModel from "../interfaces/Measure/IMeasureModel";
import SequelizeMeasure from '../database/models/SequelizeMeasure';

export default class MeasureModel implements IMeasureModel {
  private model = SequelizeMeasure;

  async findAll(filter?: 'WATER' | 'GAS'): Promise<IMeasure[]> {
    const measures = await this.model.findAll();

    if (filter) {
      return measures.filter((measure) => measure.measure_type === filter);
    }
    
    return measures.map((measure) => measure);
  }

  async findByUuid(measure_uuid: string): Promise<IMeasure | null> {
    const measure = await this.model.findOne({ where: { measure_uuid } });
    if (!measure) return null;
    
    return measure;
  }

  async create(measure: IMeasure): Promise<IMeasure> {
    const newMeasure = await this.model.create(measure);
    
    return newMeasure;
  }

  async update(uuid: string, newValue: number): Promise<IMeasure | null> {
    const [affectedRows] = await this.model.update({ measure_value: newValue }, { where: { measure_uuid: uuid } });
    
    return affectedRows > 0 ? await this.findByUuid(uuid) : null;
  }
}