import fs from 'fs/promises'
import fsSync from 'fs'
import os from 'os'
import path from 'path'

const tmpDir = os.tmpdir()

export type TmpLocation = {
  path: string
  exists: () => Promise<boolean>
  delete: () => Promise<void>
}

export function tmpTemplateArchiveFile(name: string): TmpLocation {
  const actualName = name.endsWith('.zip') ? name : name + '.zip'
  const path = asTmpPath(actualName)
  return {
    path: path,
    exists: () => Promise.resolve(fsSync.existsSync(path)),
    delete: () => fs.rm(path, { force: true }),
  }
}

export function tmpTemplateDirectory(name: string): TmpLocation {
  const path = asTmpPath(name)
  return {
    path: path,
    exists: () => Promise.resolve(fsSync.existsSync(path)),
    delete: () => fs.rmdir(path, { recursive: true }),
  }
}

function asTmpPath(name: string): string {
  return path.join(tmpDir, name)
}
