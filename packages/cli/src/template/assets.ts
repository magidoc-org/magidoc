import { copy, pathExists } from 'fs-extra'
import { isDirectory } from '../commands/utils/fileUtils'

export async function copyStaticAssets(from: string, to: string) {
  if (!(await pathExists(from))) {
    throw new Error(`Source path '${from}' does not exist.`)
  }

  if (!isDirectory(from)) {
    throw new Error(`Source path '${from}' is not a directory.`)
  }

  console.log('from', from, 'to', to)
  await copy(from, to, {
    overwrite: true,
    recursive: true,
  })
}
