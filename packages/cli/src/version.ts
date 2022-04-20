import { readFileSync } from 'fs'

let version: string | undefined = undefined

export function getVersion(): string {
  if (!version) {
    const packageJson = JSON.parse(
      readFileSync('./package.json').toString(),
    ) as {
      version: string
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
