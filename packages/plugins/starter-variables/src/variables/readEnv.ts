import fs from 'fs'

export function readEnvFile(path: string): Record<string, string> {
  if (!fs.existsSync(path)) return {}
  return JSON.parse(fs.readFileSync(path, 'utf8').toString()) as Record<
    string,
    string
  >
}
