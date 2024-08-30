import MeasureModel from "../models/MeasureModel";
import { ServiceResponse } from '../interfaces/ServiceResponse';
import IMeasure from "../interfaces/Measure/IMeasure";

export default class MeasureService {
  constructor(
    private measureModel: MeasureModel = new MeasureModel()
  ) {}
  
  public async findAll(customer_code: string, filter?: 'WATER' | 'GAS'): Promise<ServiceResponse<IMeasure[]>> {
    const measures = await this.measureModel.findAll(customer_code, filter);
    if (measures.length === 0) {
      return { status: 'ERROR', error_code: 'MEASURES_NOT_FOUND', error_description: "Nenhuma leitura encontrada" };
    }

    return { data: measures, status: 'SUCCESSFUL' };
  }

  public async findByUuid(measure_uuid: string): Promise<ServiceResponse<IMeasure | null>> {
    const measure = await this.measureModel.findByUuid(measure_uuid);
    if (!measure) {
      return { status: 'ERROR', error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês já realizada" };
    }

    return { data: measure, status: 'SUCCESSFUL' };
  }

  public async create(measure: IMeasure): Promise<ServiceResponse<IMeasure>> {
    const measureExists = await this.measureModel.findByUuid(measure.measure_uuid);
    if (measureExists) {
      return { status: 'ERROR', error_code: 'DOUBLE_REPORT', error_description: "Leitura do mês já realizada" };
    }

    const newMeasure = await this.measureModel.create(measure);
    return { data: newMeasure, status: 'SUCCESSFUL' };
  }

  public async update(uuid: string, newValue: number): Promise<ServiceResponse<IMeasure>> {
    const measure = await this.measureModel.findByUuid(uuid);
    if (measure?.has_confirmed === true) {
      return { status: 'ERROR', error_code: 'CONFIRMATION_DUPLICATE', error_description: "Leitura do mês já realizada" };
    }

    const updatedMeasure = await this.measureModel.update(uuid, newValue);
    if (!updatedMeasure) {
      return { status: 'ERROR', error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês já realizada" };
    }

    return { status: 'SUCCESSFUL' };
  }
}
