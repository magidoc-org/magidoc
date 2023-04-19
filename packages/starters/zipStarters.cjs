const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const basePath = __dirname

const VERSION = process.env["VERSION"]

if(!VERSION) {
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
  while(content.includes('"workspace:^"')) {
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

async function zipStarter(starterDirectory) {
  const outputPath = path.join(
    path.dirname(starterDirectory),
    `starter-${path.basename(starterDirectory)}.zip`,
  )
  fs.rmSync(outputPath, { force: true })

  const output = fs.createWriteStream(outputPath)
  const archive = archiver('zip', {
    zlib: { level: 9 }, // 1 = best speed, 9 = best compression
  })

  output.on('close', function () {
    console.log(`Wrote ${archive.pointer()} total bytes to ${outputPath}`)
  })

  // good practice to catch warnings (ie stat failures and other non-blocking errors)
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.warn(err)
    } else {
      throw err
    }
  })

  // good practice to catch this error explicitly
  archive.on('error', function (err) {
    throw err
  })

  archive.pipe(output)
  archive.glob(`**/*`, {
    dot: true,
    cwd: starterDirectory,
    // Exclude package.json because we are going to modify it
    ignore: excludedPatterns.concat(['package.json']),
  })

  archive.append(
    getCleanedPackageJson(path.join(starterDirectory, 'package.json')),
    { name: 'package.json' },
  )

  await archive.finalize()
}

const starters = listStarterDirectories()
starters.forEach((path) => {
  zipStarter(path)
})
