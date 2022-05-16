import { copy, pathExists } from 'fs-extra'
import { stat } from 'fs/promises'

export async function copyStaticAssets(from: string, to: string) {
  if (!(await pathExists(from))) {
    throw new Error(`Source path '${from}' does not exist.`)
  }

  if (!(await isDirectory(from))) {
    throw new Error(`Source path '${from}' is not a directory.`)
  }

  console.log('from', from, 'to', to)
  await copy(from, to, {
    overwrite: true,
    recursive: true,
  })
}

async function isDirectory(path: string): Promise<boolean> {
  const fstat = await stat(path)
  return fstat.isDirectory()
}
