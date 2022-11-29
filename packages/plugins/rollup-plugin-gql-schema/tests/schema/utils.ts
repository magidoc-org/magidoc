import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export function getSample(name: string): string {
  return fs
    .readFileSync(
      path.join(path.dirname(fileURLToPath(import.meta.url)), 'samples', name),
    )
    .toString()
}
