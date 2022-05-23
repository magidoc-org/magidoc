import fs from 'fs'

export function isDirectory(path: string): boolean {
  return (
    fs
      .statSync(path, {
        throwIfNoEntry: false,
      })
      ?.isDirectory() ?? false
  )
}
