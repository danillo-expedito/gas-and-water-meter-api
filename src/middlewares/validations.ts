import { Request, Response, NextFunction } from 'express';
import measureRequirementSchema, { schemaMeasureType } from '../schemas/requirementSchema';
import measureConfirmationSchema from '../schemas/confirmationSchema';

export const validateMeasureType = (req: Request, res: Response, next: NextFunction) => {
  const { measure_type } = req.query;
  const { error } = schemaMeasureType.validate(measure_type);

  if (error) {
    return res.status(400).json({
      error_code: 'INVALID_TYPE',
      error_description: 'Tipo de medição não permitida',
    });
  }

  next();
};

export const validateMeasureRequirement = (req: Request, res: Response, next: NextFunction) => {
  const measureRequirement = req.body;
  const { error } = measureRequirementSchema.validate(measureRequirement);

  if (error) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: error.message,
    });
  }

  next();
};

export const validateMeasureConfirmation = (req: Request, res: Response, next: NextFunction) => {
  const measureConfirmation = req.body;
  const { error } = measureConfirmationSchema.validate(measureConfirmation);

  if (error) {
    return res.status(400).json({
      error_code: 'INVALID_DATA',
      error_description: error.message,
    });
  }

  next();
};
