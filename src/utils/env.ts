import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
  CI: process.env.CI === 'true',
  HEADLESS: process.env.HEADLESS === 'true'
};
