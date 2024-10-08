"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = mapStatusHTTP;
function mapStatusHTTP(status, error_code) {
    switch (status) {
        case 'SUCCESSFUL': return 200;
        case 'ERROR':
            switch (error_code) {
                case 'MEASURES_NOT_FOUND': return 404;
                case 'MEASURE_NOT_FOUND': return 404;
                case 'CONFIRMATION_DUPLICATE': return 409;
                case 'DOUBLE_REPORT': return 409;
                case 'INVALID_DATA': return 400;
                case 'INVALID_TYPE': return 400;
                default: return 500;
            }
        default: return 500;
    }
}
