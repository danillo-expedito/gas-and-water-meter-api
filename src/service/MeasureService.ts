import MeasureModel from "../models/MeasureModel";
import { ServiceResponse, UpdateResponse } from '../interfaces/ServiceResponse';
import IMeasure from "../interfaces/Measure/IMeasure";
import { v4 as uuidv4 } from 'uuid';
import IUpload from "../interfaces/IUpload";
import GeminiClient from "../utils/geminiClient";
import IMeasureResponse from "../interfaces/Measure/IMeasureResponse";
import IList from "../interfaces/IList";

export default class MeasureService {
  constructor(
    private measureModel: MeasureModel = new MeasureModel(),
    private geminiClient: GeminiClient = new GeminiClient()
  ) {}
  
  public async findAll(customerCode: string, filter?: 'WATER' | 'GAS'): Promise<ServiceResponse<IList>> {
    const measures = await this.measureModel.findAll(customerCode, filter);
    if (measures.length === 0) {
      return { status: 'ERROR', error_code: 'MEASURES_NOT_FOUND', error_description: "Nenhuma leitura encontrada" };
    }

    return { data: {
      customer_code: customerCode,
      measures: measures.map(measure => ({
        measure_uuid: measure.measureUuid,
        measure_datetime: measure.measureDatetime,
        measure_type: measure.measureType,
        has_confirmed: measure.hasConfirmed,
        image_url: measure.imageUrl,
      }))
    }, status: 'SUCCESSFUL' };
  }

  public async findByUuid(measure_uuid: string): Promise<ServiceResponse<IMeasure | null>> {
    const measure = await this.measureModel.findByUuid(measure_uuid);
    if (!measure) {
      return { status: 'ERROR', error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês já realizada" };
    }

    return { data: measure, status: 'SUCCESSFUL' };
  }

  public async create(measure: IUpload): Promise<ServiceResponse<IMeasureResponse>> {
    const measureExists = await this.measureModel.existingMeasure(measure);
    if (measureExists) {
      return { status: 'ERROR', error_code: 'DOUBLE_REPORT', error_description: "Leitura do mês já realizada" };
    }
    const newUuid = uuidv4();
    const getMeasure = await this.geminiClient.analyzeImage(measure.image, 'image/png');

    const newMeasure = await this.measureModel.create({
      measureUuid: newUuid,
      measureDatetime: measure.measure_datetime,
      measureType: measure.measure_type,
      measureValue: Number(getMeasure),
      hasConfirmed: false,
      imageUrl: 'fantasyurl',
      customerCode: measure.customer_code,
    });

    if (newMeasure) {
      return { data: {
        image_url: 'fantasyurl',
        measure_value: Number(getMeasure),
        measure_uuid: newUuid,
      }, status: 'SUCCESSFUL' };
    }

    return { status: 'ERROR', error_code: 'MEASURE_NOT_CREATED', error_description: "Erro ao criar leitura" };
  }

  public async update(uuid: string, newValue: number): Promise<ServiceResponse<UpdateResponse>> {
    const measure = await this.measureModel.findByUuid(uuid);
    if (measure?.hasConfirmed === true) {
      return { status: 'ERROR', error_code: 'CONFIRMATION_DUPLICATE', error_description: "Leitura do mês já realizada" };
    }

    const updatedMeasure = await this.measureModel.update(uuid, newValue);
    if (!updatedMeasure) {
      return { status: 'ERROR', error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês já realizada" };
    }

    return { status: 'SUCCESSFUL', data: { success: true } };
  }
}
