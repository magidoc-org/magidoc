import fs from 'fs'
import dotenv from 'dotenv'

export function readEnvFile(path: string): Record<string, string> {
  if (!fs.existsSync(path)) return {}
  return dotenv.parse(fs.readFileSync(path, 'utf8'))
}
