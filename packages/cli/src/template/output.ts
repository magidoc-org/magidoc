import fs from 'fs-extra'

export async function moveOutputBuild(from: string, to: string) {
  await fs.rm(to, { recursive: true, force: true })
  await fs.move(from, to)
}
