import express from 'express';
import router from './routes';

class App {
    public app: express.Express;

    constructor() {
      this.app = express();

      this.config();

      this.routes();

      this.app.get('/', (req, res) => res.json({ ok: true }));
    }

    private config(): void {
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
    }

    private routes(): void {
      this.app.use(router);
    }

    public start(PORT: string | number): void {
      this.app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
      });
    }
}

export { App };

export const { app } = new App();