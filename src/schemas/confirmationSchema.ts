import Joi from 'joi';

const measureConfirmationSchema = Joi.object({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().required(),
});

export default measureConfirmationSchema;