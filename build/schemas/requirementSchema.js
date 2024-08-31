"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaMeasureType = exports.schemaDateTime = exports.schemaBase64 = void 0;
const joi_1 = __importDefault(require("joi"));
const base64Pattern = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
exports.schemaBase64 = joi_1.default.string().regex(base64Pattern).required();
exports.schemaDateTime = joi_1.default.date().iso().required();
exports.schemaMeasureType = joi_1.default.string().valid('WATER', 'GAS')
    .insensitive();
const measureRequirementSchema = joi_1.default.object({
    image: exports.schemaBase64,
    customer_code: joi_1.default.string().required(),
    measure_datetime: exports.schemaDateTime,
    measure_type: exports.schemaMeasureType,
});
exports.default = measureRequirementSchema;
