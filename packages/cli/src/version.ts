import { readFileSync, existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

let version: string | undefined = undefined

export function getVersion(): string {
  if (!version) {
    const packageJsonPath = findPackageJsonPath()
    if (!packageJsonPath) {
      throw new Error('Could not resolve path to package.json')
    }

    const packageJson = JSON.parse(
      readFileSync(packageJsonPath).toString(),
    ) as {
      version?: string
    }

    version = packageJson.version
    if (!version) {
      throw new Error(
        'Expected version to be defined in package.json. Could not extract version number, but it is required to fetch the right template versions.',
      )
    }
  }

  return version
}

function findPackageJsonPath(
  test: string = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    './package.json',
  ),
): string | undefined {
  if (existsSync(test)) {
    return test
  }

  const newPath = path.join(path.dirname(path.dirname(test)), 'package.json')
  if (newPath === test) {
    return undefined
  }

  return findPackageJsonPath(newPath)
}
