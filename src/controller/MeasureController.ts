import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MeasureService from '../service/MeasureService';
import IConfirm from '../interfaces/IConfirm';
import IHandleResponse from '../interfaces/IHandleResponse';
import IList from '../interfaces/IList';
import IUpload from '../interfaces/IUpload';


export default class MeasureController {
  constructor(
    private measureService: MeasureService = new MeasureService()
  ) {}


  public async listMeasures(req: Request, res: Response): Promise<Response> {
    const { measure_type } = req.query;
    const { customer_code } = req.params;
    const response = await this.measureService.findAll(customer_code, measure_type as 'WATER' | 'GAS');
    
    return this.handleResponse<IList>(res, response);
  }


  public async findByUuid(req: Request, res: Response): Promise<Response> {
    const { measure_uuid } = req.params;
    const response = await this.measureService.findByUuid(measure_uuid);

    return this.handleResponse(res, response);
  }


  public async create(req: Request, res: Response): Promise<Response> {
    const measure: IUpload = req.body;
    const response = await this.measureService.create(measure);

    return this.handleResponse(res, response);
  }


  public async update(req: Request, res: Response): Promise<Response> {
    const { measure_uuid, confirmed_value }: IConfirm = req.body;
    const response = await this.measureService.update(measure_uuid, confirmed_value);

    return this.handleResponse(res, response);
  }


  private handleResponse<T>(res: Response, response: IHandleResponse<T>): Response {
    if (response.status === 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(response.status)).json(response.data);
    }

    return res.status(mapStatusHTTP('ERROR', response.error_code)).json({
      error_code: response.error_code,
      error_description: response.error_description
    });
  }
}