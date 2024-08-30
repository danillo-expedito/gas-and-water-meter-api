import express from 'express';
import MeasureController from '../controller/MeasureController';
import Validations from '../middlewares/validations';

const router = express.Router();
const measureController: MeasureController = new MeasureController();

router.post('/upload', Validations.validateMeasureRequirement, measureController.create.bind(measureController));
router.patch('/confirm', Validations.validateMeasureConfirmation, measureController.update.bind(measureController));
router.get('/:customer_code/list', Validations.validateMeasureType, measureController.listMeasures.bind(measureController));

export default router;