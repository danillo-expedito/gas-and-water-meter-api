import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

export default class GeminiClient {
  private genAI: GoogleGenerativeAI;
  private modelName: string;
  private prompt: string;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
    this.modelName = "gemini-1.5-flash";
    this.prompt = "the image is in base64, the image is of a meter and you must take \
    the measurement/value of consumption, be it water or gas. Return a string with only the value of the measurement"
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
    const response = result.response;

    console.log(response.text());
    
    return response.text();
  }
}