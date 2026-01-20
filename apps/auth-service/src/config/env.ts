import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Try common locations (works whether you run from repo root or from apps/auth-service)
const candidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'apps/auth-service/.env'),
  path.resolve(__dirname, '../.env'),       // src/config -> src -> .env? (depending structure)
  path.resolve(__dirname, '../../.env'),    // src/config -> auth-service/.env
]

const envPath = candidates.find((p) => fs.existsSync(p))

dotenv.config(envPath ? { path: envPath } : undefined)

export const ENV_PATH = envPath