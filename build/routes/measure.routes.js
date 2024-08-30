"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MeasureController_1 = __importDefault(require("../controller/MeasureController"));
const validations_1 = __importDefault(require("../middlewares/validations"));
const router = express_1.default.Router();
const measureController = new MeasureController_1.default();
router.post('/upload', validations_1.default.validateMeasureRequirement, measureController.create.bind(measureController));
router.patch('/confirm', validations_1.default.validateMeasureConfirmation, measureController.update.bind(measureController));
router.get('/:customer_code/list', validations_1.default.validateMeasureType, measureController.listMeasures.bind(measureController));
exports.default = router;
