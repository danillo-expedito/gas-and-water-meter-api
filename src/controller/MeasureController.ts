import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MeasureService from '../service/MeasureService';
import IUpload from '../interfaces/IUpload';
import measureRequirementSchema, { schemaMeasureType } from '../schemas/requirementSchema';
import IConfirm from '../interfaces/IConfirm';
import measureConfirmationSchema from '../schemas/confirmationSchema';

export default class MeasureController {
  constructor(
    private measureService: MeasureService = new MeasureService()
  ) {}

  public async findAll(req: Request, res: Response): Promise<Response> {
    const { measure_type } = req.query;
    const { error } = schemaMeasureType.validate(measure_type);

    if (error) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida'
      });
    }

    const response = await this.measureService.findAll(measure_type as 'WATER' | 'GAS');
    if (response.status === 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response);
    }

    return res.status(mapStatusHTTP('ERROR', response.error_code)).json({
      error_code: response.error_code,
      error_description: response.error_description
    })
  }

  public async findByUuid(req: Request, res: Response): Promise<Response> {
    const { measure_uuid } = req.params;

    const response = await this.measureService.findByUuid(measure_uuid);

    if (response.status === 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response);
    }

    return res.status(mapStatusHTTP('ERROR', response.error_code)).json({
      error_code: response.error_code,
      error_description: response.error_description
    })
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const measureRequirement: IUpload = req.body;
    const { error } = measureRequirementSchema.validate(measureRequirement);

    if (error) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: error.message
      });
    }

    // ADD NEW LOGIC IN THE MODEL AND SERVICE USING THE GEMINI API
    const response = await this.measureService.create();

    if (response.status === 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response);
    }

    return res.status(mapStatusHTTP('ERROR', response.error_code)).json({
      error_code: response.error_code,
      error_description: response.error_description
    })
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const measureConfirmation: IConfirm = req.body;
    const { error } = measureConfirmationSchema.validate(measureConfirmation);

    // ADD SOME PARTS OF THE CODE TO A MIDDLEWARE LATER ON
    if (error) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: error.message
      });
    }
    const { measure_uuid, confirmed_value } = measureConfirmation;

    const response = await this.measureService.update(measure_uuid, confirmed_value);

    if (response.status === 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json({ success: true});
    }

    return res.status(mapStatusHTTP('ERROR', response.error_code)).json({
      error_code: response.error_code,
      error_description: response.error_description
    })
  }
}