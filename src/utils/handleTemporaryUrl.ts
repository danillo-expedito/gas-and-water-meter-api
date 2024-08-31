import fs from 'fs';
import path from 'path';

export default class TemporaryUrlHandler {
  private tempDir: string;
  private expirationTime: number;

  constructor(
    tempDir: string = path.join(__dirname, '..', 'temp'),
    expirationTime: number = 5 * 60 * 1000
  ) {
      this.tempDir = tempDir;
      this.expirationTime = expirationTime;

      if (!fs.existsSync(this.tempDir)) {
        fs.mkdirSync(this.tempDir, { recursive: true });
      }
  }

  public createTemporaryUrl(base64Image: string, uuid: string): string {
    const buffer = Buffer.from(base64Image, 'base64');
    const fileName = `${uuid}.png`;
    const filePath = path.join(this.tempDir, fileName);

    fs.writeFileSync(filePath, buffer);

    const temporaryUrl = `http://localhost:3001/temp/${fileName}`;

    setTimeout(() => {
      this.deleteFile(filePath);
    }, this.expirationTime);

    return temporaryUrl;
  }

  private deleteFile(filePath: string): void {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Failed to delete temporary file', err);
      } else {
        console.log('Temporary file deleted', filePath);
      }
    });
  }
}