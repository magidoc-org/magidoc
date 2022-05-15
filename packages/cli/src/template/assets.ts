import { copy } from 'fs-extra'

export async function copyStaticAssets(from: string, to: string) {
  if()
  await copy(from, to, {
    overwrite: true,
    recursive: true,
  })
}
