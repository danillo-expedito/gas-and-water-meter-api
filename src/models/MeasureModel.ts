import IMeasure from "../interfaces/Measure/IMeasure";
import IMeasureModel from "../interfaces/Measure/IMeasureModel";
import SequelizeMeasure from '../database/models/SequelizeMeasure';
import IUpload from "../interfaces/IUpload";
import { Op } from 'sequelize';
import sequelize from "sequelize";

export default class MeasureModel implements IMeasureModel {
  private model = SequelizeMeasure;

  async findAll(customerCode: string, filter?: 'WATER' | 'GAS'): Promise<IMeasure[]> {
    const measures = await this.model.findAll({ where: { customerCode } });

    if (filter) {
      return measures.filter((measure) => measure.measureType === filter.toUpperCase());
    }
    
    return measures.map((measure) => measure);
  }

  async findByUuid(measureUuid: string): Promise<IMeasure | null> {
    const measure = await this.model.findOne({ where: { measureUuid } });
    if (!measure) return null;
    
    return measure;
  }

  async create(measure: IMeasure): Promise<IMeasure> {
    const newMeasure = await this.model.create(measure);
    
    return newMeasure;
  }

  async update(uuid: string, newValue: number): Promise<IMeasure | null> {
    const [affectedRows] = await this.model.update(
      { measureValue: newValue, hasConfirmed: true },
      { where: { measureUuid: uuid } }
    );
    
    return affectedRows > 0 ? await this.findByUuid(uuid) : null;
  }

  async existingMeasure(upload: IUpload): Promise<IMeasure | null> {
    const dateObj = new Date(upload.measure_datetime);
    const measureMonth = dateObj.getMonth() + 1;
    const measureYear = dateObj.getFullYear();

    const measure = await this.model.findOne({
      where: {
        customerCode: upload.customer_code,
        measureType: upload.measure_type,
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('measureDatetime')), measureMonth),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('measureDatetime')), measureYear),
        ],
      }
    });
    
    if (!measure) return null;
    return measure;
  }
}