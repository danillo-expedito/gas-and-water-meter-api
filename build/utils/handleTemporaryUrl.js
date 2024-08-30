"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class TemporaryUrlHandler {
    constructor(tempDir = path_1.default.join(__dirname, '..', 'temp'), expirationTime = 5 * 60 * 1000) {
        this.tempDir = tempDir;
        this.expirationTime = expirationTime;
        if (!fs_1.default.existsSync(this.tempDir)) {
            fs_1.default.mkdirSync(this.tempDir, { recursive: true });
        }
    }
    createTemporaryUrl(base64Image, uuid) {
        const buffer = Buffer.from(base64Image, 'base64');
        const fileName = `${uuid}.png`;
        const filePath = path_1.default.join(this.tempDir, fileName);
        fs_1.default.writeFileSync(filePath, buffer);
        const temporaryUrl = `http://localhost:3001/temp/${fileName}`;
        setTimeout(() => {
            this.deleteFile(filePath);
        }, this.expirationTime);
        return temporaryUrl;
    }
    deleteFile(filePath) {
        fs_1.default.unlink(filePath, (err) => {
            if (err) {
                console.error('Failed to delete temporary file', err);
            }
            else {
                console.log('Temporary file deleted', filePath);
            }
        });
    }
}
exports.default = TemporaryUrlHandler;
