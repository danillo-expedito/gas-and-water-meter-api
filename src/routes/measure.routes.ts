import express from 'express';
import MeasureController from '../controller/MeasureController';
import {
  validateMeasureConfirmation,
  validateMeasureRequirement,
  validateMeasureType,
} from '../middlewares/validations';

const router = express.Router();
const measureController: MeasureController = new MeasureController();

router.post('/upload', validateMeasureRequirement, measureController.create);
router.patch('/confirm', validateMeasureConfirmation, measureController.update);
router.get('/:customer_code/list?measure_type', validateMeasureType, measureController.listMeasures);

export default router;