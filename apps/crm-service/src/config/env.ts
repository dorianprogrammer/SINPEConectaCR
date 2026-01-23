import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const candidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'apps/crm-service/.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../../.env'),
];

const envPath = candidates.find((p) => fs.existsSync(p));

dotenv.config(envPath ? { path: envPath } : undefined);

export const ENV_PATH = envPath;
