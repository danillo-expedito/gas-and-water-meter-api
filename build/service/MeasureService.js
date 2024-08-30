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
const MeasureModel_1 = __importDefault(require("../models/MeasureModel"));
const uuid_1 = require("uuid");
const geminiClient_1 = __importDefault(require("../utils/geminiClient"));
const handleTemporaryUrl_1 = __importDefault(require("../utils/handleTemporaryUrl"));
class MeasureService {
    constructor(measureModel = new MeasureModel_1.default(), geminiClient = new geminiClient_1.default()) {
        this.measureModel = measureModel;
        this.geminiClient = geminiClient;
    }
    findAll(customerCode, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const measures = yield this.measureModel.findAll(customerCode, filter);
            if (measures.length === 0) {
                return { status: 'ERROR', error_code: 'MEASURES_NOT_FOUND', error_description: "Nenhuma leitura encontrada" };
            }
            return { data: {
                    customer_code: customerCode,
                    measures: measures.map(measure => ({
                        measure_uuid: measure.measureUuid,
                        measure_datetime: measure.measureDatetime,
                        measure_type: measure.measureType,
                        has_confirmed: measure.hasConfirmed,
                        image_url: measure.imageUrl,
                    }))
                }, status: 'SUCCESSFUL' };
        });
    }
    findByUuid(measure_uuid) {
        return __awaiter(this, void 0, void 0, function* () {
            const measure = yield this.measureModel.findByUuid(measure_uuid);
            if (!measure) {
                return { status: 'ERROR', error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês já realizada" };
            }
            return { data: measure, status: 'SUCCESSFUL' };
        });
    }
    create(measure) {
        return __awaiter(this, void 0, void 0, function* () {
            const measureExists = yield this.measureModel.existingMeasure(measure);
            if (measureExists) {
                return { status: 'ERROR', error_code: 'DOUBLE_REPORT', error_description: "Leitura do mês já realizada" };
            }
            const newUuid = (0, uuid_1.v4)();
            const getMeasure = yield this.geminiClient.analyzeImage(measure.image, 'image/png');
            const urlHandler = new handleTemporaryUrl_1.default();
            const imageUrl = yield urlHandler.createTemporaryUrl(measure.image, newUuid);
            const newMeasure = yield this.measureModel.create({
                measureUuid: newUuid,
                measureDatetime: measure.measure_datetime,
                measureType: measure.measure_type,
                measureValue: Number(getMeasure),
                hasConfirmed: false,
                imageUrl: imageUrl,
                customerCode: measure.customer_code,
            });
            if (newMeasure) {
                return { data: {
                        image_url: imageUrl,
                        measure_value: Number(getMeasure),
                        measure_uuid: newUuid,
                    }, status: 'SUCCESSFUL' };
            }
            return { status: 'ERROR', error_code: 'MEASURE_NOT_CREATED', error_description: "Erro ao criar leitura" };
        });
    }
    update(uuid, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const measure = yield this.measureModel.findByUuid(uuid);
            if ((measure === null || measure === void 0 ? void 0 : measure.hasConfirmed) === true) {
                return { status: 'ERROR', error_code: 'CONFIRMATION_DUPLICATE', error_description: "Leitura do mês já realizada" };
            }
            const updatedMeasure = yield this.measureModel.update(uuid, newValue);
            if (!updatedMeasure) {
                return { status: 'ERROR', error_code: 'MEASURE_NOT_FOUND', error_description: "Leitura do mês já realizada" };
            }
            return { status: 'SUCCESSFUL', data: { success: true } };
        });
    }
}
exports.default = MeasureService;
