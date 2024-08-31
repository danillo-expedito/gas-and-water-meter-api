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
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
class GeminiClient {
    constructor() {
        var _a;
        this.genAI = new generative_ai_1.GoogleGenerativeAI((_a = process.env.GEMINI_API_KEY) !== null && _a !== void 0 ? _a : '');
        this.modelName = "gemini-1.5-flash";
        this.prompt = this.loadPrompt();
    }
    loadPrompt() {
        const filePath = path_1.default.resolve(__dirname, 'prompt.json');
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        return data.prompt;
    }
    base64ToGenerativePart(base64Data, mimeType) {
        return {
            inlineData: {
                data: base64Data,
                mimeType
            }
        };
    }
    analyzeImage(base64Image, mimeType) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.genAI.getGenerativeModel({ model: this.modelName });
            const imagePart = this.base64ToGenerativePart(base64Image, mimeType);
            const result = yield model.generateContent([this.prompt, imagePart]);
            const response = yield result.response;
            console.log(response.text());
            return response.text();
        });
    }
}
exports.default = GeminiClient;
