"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requirementSchema_1 = __importStar(require("../schemas/requirementSchema"));
const confirmationSchema_1 = __importDefault(require("../schemas/confirmationSchema"));
class Validations {
}
Validations.validateMeasureType = (req, res, next) => {
    const { measure_type } = req.query;
    const { error } = requirementSchema_1.schemaMeasureType.validate(measure_type);
    if (error) {
        return res.status(400).json({
            error_code: 'INVALID_TYPE',
            error_description: 'Tipo de medição não permitida',
        });
    }
    next();
};
Validations.validateMeasureRequirement = (req, res, next) => {
    const measureRequirement = req.body;
    const { error } = requirementSchema_1.default.validate(measureRequirement);
    if (error) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: error.message,
        });
    }
    next();
};
Validations.validateMeasureConfirmation = (req, res, next) => {
    const measureConfirmation = req.body;
    const { error } = confirmationSchema_1.default.validate(measureConfirmation);
    if (error) {
        return res.status(400).json({
            error_code: 'INVALID_DATA',
            error_description: error.message,
        });
    }
    next();
};
exports.default = Validations;
