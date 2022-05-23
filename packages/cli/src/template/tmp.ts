import fs from 'fs-extra'
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
  return tmpLocation(asTmpPath(actualName))
}

export function tmpTemplateDirectory(name: string): TmpLocation {
  return tmpLocation(asTmpPath(name))
}

export function tmpLocation(path: string): TmpLocation {
  return {
    path: path,
    exists: () => Promise.resolve(fs.existsSync(path)),
    delete: () => fs.rm(path, { recursive: true, force: true }),
  }
}

function asTmpPath(name: string): string {
  return path.join(tmpDir, name)
}
