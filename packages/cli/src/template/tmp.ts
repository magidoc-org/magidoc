import fs from 'fs'
import { tmpNameSync } from 'tmp'

export type TmpLocation = {
  path: string
  delete: () => Promise<void>
}

export function tmpTemplateArchiveFile(): TmpLocation {
  const path = tmpNameSync({ template: 'template-XXXXXX.zip' })
  return {
    path: path,
    delete: () => Promise.resolve(fs.rmSync(path, { force: true })),
  }
}

export function tmpTemplateDirectory(): TmpLocation {
  const path = tmpNameSync({ template: 'template-XXXXXX' })
  return {
    path: path,
    delete: () => Promise.resolve(fs.rmdirSync(path, { recursive: true })),
  }
}
