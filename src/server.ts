import { App } from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.APP_PORT || 3001;

new App().start(PORT);