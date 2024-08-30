"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SequelizeMeasure_1 = __importDefault(require("../database/models/SequelizeMeasure"));
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
class MeasureModel {
    constructor() {
        this.model = SequelizeMeasure_1.default;
    }
    findAll(customerCode, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const measures = yield this.model.findAll({ where: { customerCode } });
            if (filter) {
                return measures.filter((measure) => measure.measureType === filter.toUpperCase());
            }
            return measures.map((measure) => measure);
        });
    }
    findByUuid(measureUuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const measure = yield this.model.findOne({ where: { measureUuid } });
            if (!measure)
                return null;
            return measure;
        });
    }
    create(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMeasure = yield this.model.create(measure);
            return newMeasure;
        });
    }
    update(uuid, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const [affectedRows] = yield this.model.update({ measureValue: newValue, hasConfirmed: true }, { where: { measureUuid: uuid } });
            return affectedRows > 0 ? yield this.findByUuid(uuid) : null;
        });
    }
    existingMeasure(upload) {
        return __awaiter(this, void 0, void 0, function* () {
            const dateObj = new Date(upload.measure_datetime);
            const measureMonth = dateObj.getMonth() + 1;
            const measureYear = dateObj.getFullYear();
            const measure = yield this.model.findOne({
                where: {
                    customerCode: upload.customer_code,
                    measureType: upload.measure_type,
                    [sequelize_1.Op.and]: [
                        sequelize_2.default.where(sequelize_2.default.fn('MONTH', sequelize_2.default.col('measureDatetime')), measureMonth),
                        sequelize_2.default.where(sequelize_2.default.fn('YEAR', sequelize_2.default.col('measureDatetime')), measureYear),
                    ],
                }
            });
            if (!measure)
                return null;
            return measure;
        });
    }
}
exports.default = MeasureModel;
