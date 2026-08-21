import { ZipArchive } from 'archiver'
import { spawn } from 'child_process'
import fs from 'fs'
import { createRequire } from 'module'
import os from 'os'
import path from 'path'
import url from 'url'

const basePath = url.fileURLToPath(new URL('.', import.meta.url))

const bundledPnpm = (() => {
  const require = createRequire(path.join(basePath, '..', 'cli', 'package.json'))
  const manifestPath = require.resolve('pnpm')
  return path.join(path.dirname(manifestPath), require(manifestPath).bin.pnpm)
})()

const LOCKFILE_ATTEMPTS = 5
const LOCKFILE_RETRY_DELAY_MS = 15_000

const VERSION = process.env.VERSION

if (!VERSION) {
  throw new Error('No VERSION environment variable was found')
}

const excludedPatterns = [
  '.svelte-kit/**',
  'build/**',
  'node_modules/**',
  'static/**',
  '**/_variables.json',
  '**/_schema.graphqls',
]

function listStarterDirectories() {
  const files = fs.readdirSync(basePath)
  return files
    .map((file) => path.join(basePath, file))
    .filter((file) => {
      const stat = fs.statSync(file)
      return stat.isDirectory()
    })
}

function getCleanedPackageJson(path) {
  let content = fs.readFileSync(path).toString()

  // Pnpm started using this syntax for workspace deps, and the deploy command does not fill out the package.json properly.
  while (content.includes('"workspace:^"')) {
    content = content.replace('"workspace:^"', `"${VERSION}"`)
  }

  // Replace workspace deps with deployed deps
  while (content.includes('workspace:')) {
    content = content.replace('workspace:', '')
  }

  // Use fix versions
  while (content.includes('"^')) {
    content = content.replace('"^', '"')
  }

  return content
}

function runPnpm(args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [bundledPnpm, ...args], { cwd })

    let output = ''
    const handler = (chunk) => {
      output += String(chunk)
    }
    child.stdout.on('data', handler)
    child.stderr.on('data', handler)

    child.on('error', (error) => reject(new Error(`Failed to launch 'pnpm ${args.join(' ')}': ${error.message}`)))
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`'pnpm ${args.join(' ')}' failed with status ${code ?? 'unknown'}\n\n${output}`))
      }
    })
  })
}

async function generateLockfile(starterDirectory, packageJson) {
  const stagingDirectory = fs.mkdtempSync(path.join(os.tmpdir(), `magidoc-lock-${path.basename(starterDirectory)}-`))

  try {
    fs.writeFileSync(path.join(stagingDirectory, 'package.json'), packageJson)

    for (const [source, target] of [
      ['_pnpm-workspace.yaml', 'pnpm-workspace.yaml'],
      ['.npmrc', '.npmrc'],
    ]) {
      const sourcePath = path.join(starterDirectory, source)
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, path.join(stagingDirectory, target))
      }
    }

    for (let attempt = 1; attempt <= LOCKFILE_ATTEMPTS; attempt++) {
      try {
        await runPnpm(['install', '--lockfile-only'], stagingDirectory)
        break
      } catch (error) {
        if (attempt === LOCKFILE_ATTEMPTS) {
          throw new Error(
            `Could not resolve a lockfile for ${path.basename(starterDirectory)} after ${LOCKFILE_ATTEMPTS} attempts. ` +
              'The starter depends on @magidoc packages at the version being released, so they must be published first.',
            { cause: error },
          )
        }

        console.warn(`Lockfile resolution attempt ${attempt}/${LOCKFILE_ATTEMPTS} failed, retrying: ${error.message}`)
        await new Promise((resolve) => setTimeout(resolve, LOCKFILE_RETRY_DELAY_MS))
      }
    }

    return fs.readFileSync(path.join(stagingDirectory, 'pnpm-lock.yaml'))
  } finally {
    fs.rmSync(stagingDirectory, { recursive: true, force: true })
  }
}

async function zipStarter(starterDirectory) {
  const outputPath = path.join(path.dirname(starterDirectory), `starter-${path.basename(starterDirectory)}.zip`)
  fs.rmSync(outputPath, { force: true })

  const packageJson = getCleanedPackageJson(path.join(starterDirectory, 'package.json'))
  const lockfile = await generateLockfile(starterDirectory, packageJson)

  const output = fs.createWriteStream(outputPath)
  const archive = new ZipArchive('zip', {
    zlib: { level: 9 }, // 1 = best speed, 9 = best compression
  })

  output.on('close', () => {
    console.log(`Wrote ${archive.pointer()} total bytes to ${outputPath}`)
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
      console.warn(err)
    } else {
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', (err) => {
    throw err
  })

  archive.pipe(output)
  archive.glob('**/*', {
    dot: true,
    cwd: starterDirectory,
    // Exclude package.json because we are going to modify it
    // Exclude _pnpm-workspace.yaml because we are going to rename it
    // Exclude pnpm-lock.yaml because we resolve our own
    ignore: excludedPatterns.concat(['package.json', '_pnpm-workspace.yaml', 'pnpm-lock.yaml']),
  })

  archive.append(packageJson, { name: 'package.json' })
  archive.append(lockfile, { name: 'pnpm-lock.yaml' })

  const pnpmWorkspacePath = path.join(starterDirectory, '_pnpm-workspace.yaml')
  if (fs.existsSync(pnpmWorkspacePath)) {
    archive.file(pnpmWorkspacePath, { name: 'pnpm-workspace.yaml' })
  }

  await archive.finalize()
}

const starters = listStarterDirectories()

for (const starter of starters) {
  await zipStarter(starter)
}
