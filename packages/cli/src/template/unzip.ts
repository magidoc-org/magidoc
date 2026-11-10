import { unzipSync } from 'fflate'
import fs from 'fs-extra'
import path from 'path'

export type UnzipConfiguration = {
  zipLocation: string
  destination: string
}

const MAX_EXTRACTED_BYTES = 100 * 1024 * 1024

export async function unzipTemplate(config: UnzipConfiguration) {
  const root = path.resolve(config.destination)
  let extractedBytes = 0
  const files = unzipSync(await fs.readFile(config.zipLocation), {
    filter: (entry) => {
      extractedBytes += entry.originalSize
      if (extractedBytes > MAX_EXTRACTED_BYTES) {
        throw new Error(`Refusing to extract more than ${MAX_EXTRACTED_BYTES} bytes from ${config.zipLocation}`)
      }
      return true
    },
  })

  // Validate every entry before writing anything, so a rejected archive leaves nothing behind
  const entries = Object.entries(files).map(([rawName, data]) => {
    const name = decodeName(rawName)
    const target = path.resolve(root, name)
    const relative = path.relative(root, target)
    // fflate never creates symlinks, so checking the resolved path is enough to prevent zip-slip
    if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
      throw new Error(`Refusing to extract '${name}' outside of ${root}`)
    }
    return { name, target, data }
  })

  await fs.ensureDir(root)
  for (const { name, target, data } of entries) {
    if (name.endsWith('/')) {
      await fs.ensureDir(target)
    } else {
      await fs.outputFile(target, data)
    }
  }
}

// fflate decodes names lacking the UTF-8 flag as latin1, but most zip tools write UTF-8 there anyway
function decodeName(name: string) {
  const bytes = Buffer.from(name, 'latin1')
  // Characters above 0xFF mean the flag was set and the name is already decoded
  if (bytes.toString('latin1') !== name) return name
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(bytes)
  } catch {
    return name
  }
}
