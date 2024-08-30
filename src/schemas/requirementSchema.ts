import Joi from 'joi';

const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

export const schemaBase64 = Joi.string().regex(base64Pattern).required();

export const schemaDateTime = Joi.date().iso().required();

export const schemaMeasureType = Joi.string().valid('WATER', 'GAS')
  .insensitive();

const measureRequirementSchema = Joi.object({
  image: schemaBase64,
  customer_code: Joi.string().required(),
  measure_datetime: schemaDateTime,
  measure_type: schemaMeasureType,
});

export default measureRequirementSchema;