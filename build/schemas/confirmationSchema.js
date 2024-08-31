"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const measureConfirmationSchema = joi_1.default.object({
    measure_uuid: joi_1.default.string().required(),
    confirmed_value: joi_1.default.number().required(),
});
exports.default = measureConfirmationSchema;
