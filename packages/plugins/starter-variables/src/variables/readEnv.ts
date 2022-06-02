import fs from 'fs'

export function readEnvFile(path: string): Record<string, string> {
  if (!fs.existsSync(path)) return {}

  return fs
    .readFileSync('./.env', {
      encoding: 'utf8',
    })
    .toString()
    .split('\n')
    .map((line) => line.split('='))
    .map((parts) => ({
      key: parts[0],
      value: parts.slice(1).join('=').replace('\\n', '\n'),
    }))
    .reduce(
      (previous, current) => ({
        ...previous,
        [current.key]: current.value,
      }),
      {},
    )
}
