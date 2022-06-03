import fs from 'fs'
import dotenv from 'dotenv'

export function readEnvFile(path: string): Record<string, string> {
  if (!fs.existsSync(path)) return {}
  const result = dotenv.parse(fs.readFileSync(path, 'utf8'))
  return Object.keys(result).reduce(
    (previous, current) => ({
      ...previous,
      [current]: result[current].replaceAll('\\`', '`'),
    }),
    {},
  )
}
