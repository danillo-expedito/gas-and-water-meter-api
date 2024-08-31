import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

export default class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private modelName: string;
  private prompt: string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
    this.modelName = "gemini-1.5-flash";
    this.prompt = this.loadPrompt();
  }

  private loadPrompt(): string {
    const filePath = path.resolve(__dirname, 'prompt.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    return data.prompt;
  }

  private base64ToGenerativePart(base64Data: string, mimeType: string) {
    return {
      inlineData: {
        data: base64Data,
        mimeType
      }
    };
  }

  async analyzeImage(base64Image: string, mimeType: string) {
    const model = this.genAI.getGenerativeModel({ model: this.modelName });
    const imagePart = this.base64ToGenerativePart(base64Image, mimeType);

    const result = await model.generateContent([this.prompt, imagePart]);
    const response = await result.response;

    console.log(response.text());
    
    return response.text();
  }
}