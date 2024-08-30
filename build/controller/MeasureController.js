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
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
const MeasureService_1 = __importDefault(require("../service/MeasureService"));
class MeasureController {
    constructor(measureService = new MeasureService_1.default()) {
        this.measureService = measureService;
    }
    listMeasures(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { measure_type } = req.query;
            const { customer_code } = req.params;
            const response = yield this.measureService.findAll(customer_code, measure_type);
            return this.handleResponse(res, response);
        });
    }
    findByUuid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { measure_uuid } = req.params;
            const response = yield this.measureService.findByUuid(measure_uuid);
            return this.handleResponse(res, response);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const measure = req.body;
            const response = yield this.measureService.create(measure);
            return this.handleResponse(res, response);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { measure_uuid, confirmed_value } = req.body;
            const response = yield this.measureService.update(measure_uuid, confirmed_value);
            return this.handleResponse(res, response);
        });
    }
    handleResponse(res, response) {
        if (response.status === 'SUCCESSFUL') {
            return res.status((0, mapStatusHTTP_1.default)(response.status)).json(response.data);
        }
        return res.status((0, mapStatusHTTP_1.default)('ERROR', response.error_code)).json({
            error_code: response.error_code,
            error_description: response.error_description
        });
    }
}
exports.default = MeasureController;
